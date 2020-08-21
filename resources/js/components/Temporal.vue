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
	.bar:hover{
		fill:red;
	}

</style>
<template>
	<div>
		<h1 class="text-4xl">Temporal</h1>
		<div id="svg-area"></div>
	</div>
</template>

<script>
import * as d3 from 'd3';
export default{
	data() {
		return {
			xxx: null,
		}
	},

	methods: {
		render(){
			const data = this.$root.csv_data;
			const margin = {top: 10, right: 30, bottom: 30, left: 40};
			const width = 960 - margin.left - margin.right;
			const height = 500 - margin.top - margin.bottom;

			const tooltip = d3.select("body").append("div").attr("class", "toolTip");
			const tooltip_date = (date) => {
				const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
				return months[date.getMonth()] + ", " + date.getFullYear();
			}

			const xValue = (d) => new Date(d.observed_on);
			const xAxisLabel = "Time";
			const yValue = (d) => d.id;
			const yAxisLabel = "Observations";
			const title = `${yAxisLabel} vs. ${xAxisLabel}`;
			const circleRadius = 15;


			const xScale = d3.scaleTime()
				.domain([d3.min(data, xValue), d3.max(data, xValue)])
				.range([0, width])
				.nice();
			console.log(xValue(data[0]));

			const yScale = d3.scaleLinear()
				.range([height, 0])
				.nice();

			const histogram = d3.histogram()
				.value(function(d){ return d.observed_on; })
				.domain(xScale.domain())
				.thresholds(xScale.ticks(d3.timeMonth));

			var svg = d3.select("#svg-area").append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var bins = histogram(data);

			 yScale.domain([0, d3.max(bins, function(d) { return d.length; })]);

			 const chart = svg.selectAll("rect").data(bins);
			 chart.enter().append("rect")
			 	.attr("class", "bar")
			 	.attr("x", 1)
			 	.attr("transform", function(d) {
			 		return `translate(${xScale(d.x0)}, ${yScale(d.length)} )`; })
			 	.attr("width", function(d) { return xScale(d.x1) - xScale(d.x0) ; })
			 	.attr("height", function(d) { return height - yScale(d.length); })
			 	.on("mousemove", function(d){
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
	mounted: function(){
		this.render();
	}
};
</script>
