<template>
	<div>
		<h1 class="text-4xl">Temporal</h1>
		<a href="#" @click="temporalData">Calculate</a>
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
		temporalData() {
			const data = this.$root.csv_data
				.then((data) => {
					data.forEach((d) => {
						d.id = +d.id;
						d.observed_on = new Date(d.observed_on).toLocaleDateString();
					});
				this.render(data)
				});

		},
		render(data){

			var margin = {top: 10, right: 30, bottom: 30, left: 40},
			width = 960 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;

			const xValue = (d) => d.observed_on;
			const xAxisLabel = "Time";
			const yValue = (d) => d.id;
			const yAxisLabel = "Observations";
			const title = `${yAxisLabel} vs. ${xAxisLabel}`;
			const circleRadius = 15;


			const xScale = d3.scaleTime()
				.domain(d3.extent(data, xValue))
				.range([0, width])
				.nice();

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


			 svg.selectAll("rect")
		      .data(bins)
		    .enter().append("rect")
		      .attr("class", "bar")
		      .attr("x", 1)
		      .attr("transform", function(d) {
			 	console.log(xScale(d.x1));
				  return `translate(${xScale(d.x0)}, ${yScale(d.length)} )`; })
		      // .attr("width", function(d) { return xScale(d.x1) - xScale(d.x0) ; })
		      .attr("width", 10)
		      .attr("height", function(d) { return height - yScale(d.length); });

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
	}
};
</script>
``
