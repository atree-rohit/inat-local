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
	.continent {
	    /*fill: #f0e4dd;*/
	    stroke: #a85;
	    stroke-width: .5;
	}

	.circles {
	    fill: red;
	    opacity: .5;
	}

	.labels {
	    font-family: sans-serif;
	    font-size: 11px;
	    fill: #444444;
	}
</style>

<template>
	<div>
		<h1 class="text-4xl">Spatial</h1>
		<div id="map-container" class="svg-container"></div>
		<table class="table">
			<thead>
				<tr>
					<th>City</th>
					<th>Latitude</th>
					<th>Longitude</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="coordinate in coordinates">
					<td>{{ coordinate.City }}</td>
					<td>{{ coordinate.Latitude }}</td>
					<td>{{ coordinate.Longitude }}</td>
				</tr>
			</tbody>
		</table>


	</div>

</template>

<script>
import * as d3 from 'd3';
// import { in_state } from '../in_state.js';
	export default{
		data(){
			return{
				coordinates: [],
			}
		},
		methods: {
			spatialData() {
				var decimal_precision = 1;

				const data = this.$root.csv_data
					data.forEach((d) => {
						var duplicate_flag = false;
						this.coordinates.forEach((du) => {
							if(du.Latitude.toFixed(decimal_precision) == parseFloat(d.Latitude).toFixed(decimal_precision) && du.Longitude.toFixed(decimal_precision) == parseFloat(d.Longitude).toFixed(decimal_precision))
								duplicate_flag = true;
						});
						if(!duplicate_flag && !isNaN(parseFloat(d.Longitude))){
							this.coordinates.push(
							{
								"City": d.City,
								"Longitude": parseFloat(d.Longitude),
								"Latitude": parseFloat(d.Latitude)
							});
						}
					});
				return(this.coordinates);
			},
		},
		mounted: function() {
			var w = 1400;
			const tooltip = d3.select("body").append("div").attr("class", "toolTip");
			var h = 700;
			var svg = d3.select("div#map-container").append("svg").attr("preserveAspectRatio", "xMinYMin meet")
				.attr("viewBox", "0 0 " + w + " " + h).style("background","#c9e8fd")
				.classed("svg-content", true);
			var projection = d3.geoMercator().translate([w/2, h/2]).scale(1000).center([80,23.5]);
			var path = d3.geoPath().projection(projection);
			var worldmap = this.$root.in_states;
			var cities = this.spatialData();
			var g = svg.append("g");

			console.log(worldmap);

			Promise.all([worldmap, cities]).then(function(values){
			    g.selectAll("path")
			        .data(values[0].features)
			        .enter()
			        .append("path")
			        .attr("class","continent")
			        .attr("fill","none")
			        .attr("stroke","black")
			        .attr("d", path),

			    g.selectAll("circle")
			        .data(values[1])
			        .enter()
			        .append("circle")
			        .attr("class","circles")
			        .attr("cx", function(d) {return projection([d.Longitude, d.Latitude])[0];})
			        .attr("cy", function(d) {return projection([d.Longitude, d.Latitude])[1];})
			        .attr("r", 2)
			        .on("mousemove", function(d){
			 		tooltip
				 		.style("left", d3.event.pageX + 20 + "px")
				 		.style("top", d3.event.pageY + 20 + "px")
				 		.style("display", "inline-block")
				 		.html(d.City);
        			})
    			.on("mouseout", function(d){ tooltip.style("display", "none");});
			});

			var zoom = d3.zoom()
				.scaleExtent([1, 25])
				.on('zoom', function() {
					g.selectAll('circle')
						.attr('transform', d3.event.transform),
					g.selectAll('path')
						.attr('transform', d3.event.transform);
				});

			svg.call(zoom);
		}
	};
</script>
