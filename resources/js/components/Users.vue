<template>
	<div>
		<h1 class="text-4xl">Users+</h1>
		<div id="svg-area"></div>
	</div>

</template>

<script>
	export default{
		data() {
			return {
				col: 'all',
				data: this.$root.csv_data,
				margin: {top: 10, right: 30, bottom: 30, left: 40},
			}
		},

		methods: {
			data_prepare(){
				const data = this.data;
				const col = this.col;
				let op = [];
				let newFlag = true;
				data.forEach(d => {
					if(col == 'all'){
						newFlag = true;
						op.forEach( da => {
							if(da.user === d.user){
								da.observations++;
								newFlag = false;
							}
						});
						if(newFlag){
							op.push({
								"user": d.user,
								"observations": 1,
							});
						}
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
				const tooltip_date = (user_data) => {
					return user_data.user + "-" + user_data.observations;
				}

				const xValue = (d) => d.user;
				const xAxisLabel = "Users";
				const yValue = (d) => d.observations;
				const yAxisLabel = "Observations";
				const title = `${yAxisLabel} vs. ${xAxisLabel}`;
				const circleRadius = 15;

				const xScale = d3.scaleBand()
					.domain(data.map(value => value.user))
					.range([0, width])
					.padding(0.1);

				const yScale = d3.scaleLinear()
					.domain([0, d3.max(data.map(value => value.observations))])
					.range([height, 0])
					.nice();

				if(!d3.select("#svg-area svg").empty()){
					d3.selectAll("svg").remove();
				}

				var svg = d3.select("#svg-area").append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					console.log(data);

				const xAxis = d3.axisBottom(xScale)
					.tickSize(margin.left + margin.right - width)
					.tickPadding(15);

				const yAxis = d3.axisLeft(yScale)
					.tickSize(-innerWidth)
					.tickPadding(10);

				 const chart = svg.selectAll("rect").data(data);
				if(this.$root.data_set){
					chart.enter().append("rect")
					 	.attr("class", "bar")
					 	.attr("transform", (d) => `translate(0, ${yScale(d.observations)} )`)
					 	.attr("x", (d) => xScale(xValue(d)))
					 	.attr("width", xScale.bandwidth())
					 	.attr("height", (d) => height-yScale(yValue(d)))
					 	.on("mousemove", (d) => {
					 		tooltip
						 		.style("left", d3.event.pageX + 20 + "px")
						 		.style("top", d3.event.pageY + 20 + "px")
						 		.style("display", "inline-block")
						 		.html(tooltip_date(d));
		        			})
		    			.on("mouseout", function(d){ tooltip.style("display", "none");});

				  // add the x Axis
				  svg.append("g")
				      .attr("transform", "translate(0," + height + ")")
				      .call(d3.axisBottom(xScale));

				  // // add the y Axis
				  svg.append("g")
				      .call(d3.axisLeft(yScale));

					svg.append('text')
					.attr('class', 'title')
					.attr('y', -10)
					.text(title)

				}
			},
		},
		mounted: function(){
			this.render();
		}
	};
</script>
