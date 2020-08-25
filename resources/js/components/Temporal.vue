<style>
	.toolTip {
		position: absolute;
		display: none;
		height: auto;
		background: none repeat scroll 0 0 #ccc;
		border: 1px solid #999;
		padding: 4px;
		font-size:.7em;
		text-align: center;
		border-radius:5px;
	}
	.bar{
		fill: steelblue;
	}
	.bar:hover{
		fill:red;
	}

</style>
<template>
	<div>
		<h1 class="text-4xl">Temporal</h1>
		<select v-model="col" @change="render()">
			<option disabled value="">Please select one</option>
			<option>observed_on</option>
			<option>created_at</option>
			<option>updated_at</option>
		</select>
		<span>Selected: {{ col }}</span>
		<div id="svg-area"></div>
	</div>
</template>

<script>
import * as d3 from 'd3';
export default{
	data() {
		return {
			col: 'observed_on',
			data: this.$root.csv_data,
			margin: {top: 10, right: 30, bottom: 30, left: 40},
		}
	},

	methods: {
		data_prepare(){
			const data = this.data;
			const col = this.col;
			let op = [];
			data.forEach(d => {
				if(d[col].getFullYear() > 189){
					op.push({
						"id": d["id"],
						"date": d[col]
					});

				}
			});
			return op;

		},
		render(){
			const data = this.data_prepare();
			const margin = this.margin;
			const width = 960 - margin.left - margin.right;
			const height = 500 - margin.top - margin.bottom;
			const selected_col = this.col;

			const tooltip = d3.select("body").append("div").attr("class", "toolTip");
			const tooltip_date = (date) => {
				const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
				return months[date.getMonth()] + ", " + date.getFullYear();
			}

			const xValue = (d) => d.date;
			const xAxisLabel = "Time";
			const yValue = (d) => d.id;
			const yAxisLabel = "Observations";
			const title = `${yAxisLabel} vs. ${xAxisLabel}`;
			const circleRadius = 15;

			const xScale = d3.scaleTime()
				.domain(d3.extent(data, xValue))
				.range([0, width])
				.nice();
			console.log(xScale.domain());
			const yScale = d3.scaleLinear()
				.range([height, 0])
				.nice();

			const histogram = d3.histogram()
				.value(xValue)
				.domain(xScale.domain())
				.thresholds(xScale.ticks(d3.timeMonth));

			if(!d3.select("#svg-area svg").empty()){
				d3.selectAll("svg").remove();
			}

			var svg = d3.select("#svg-area").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var bins = histogram(data);

			 yScale.domain([0, d3.max(bins, function(d) { return d.length; })]);

			 const chart = svg.selectAll("rect").data(bins);

			if(this.$root.data_set){
				chart.enter().append("rect")
				 	.attr("class", "bar")
				 	.attr("x", 1)
				 	.attr("transform", (d) => `translate(${xScale(d.x0)}, ${yScale(d.length)} )`)
				 	.attr("width", (d) => xScale(d.x1) - xScale(d.x0))
				 	.attr("height", (d) => height - yScale(d.length))
				 	.on("mousemove", (d) => {
				 		tooltip
					 		.style("left", d3.event.pageX + 20 + "px")
					 		.style("top", d3.event.pageY + 20 + "px")
					 		.style("display", "inline-block")
					 		.html(tooltip_date(d.x1) + "<br>" + d.length + " observations");
	        			})
	    			.on("mouseout", function(d){ tooltip.style("display", "none");});

			  // add the x Axis
			  svg.append("g")
			      .attr("transform", "translate(0," + height + ")")
			      .call(d3.axisBottom(xScale));

			  // add the y Axis
			  svg.append("g")
			      .call(d3.axisLeft(yScale));

				svg.append('text')
				.attr('class', 'title')
				.attr('y', -10)
				.text(title)

			}
		},
		render_created(){

		},
	},
	mounted: function(){
		if(!this.$root.data_set)
			this.$router.push('/')

		this.render();
	}
};
</script>
