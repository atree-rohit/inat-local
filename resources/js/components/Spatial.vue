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
	    /*stroke: #a85;*/
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
	</div>

</template>

<script>
import * as d3 from 'd3';
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
						this.coordinates.forEach((du,i) => {
							if(du.latitude.toFixed(decimal_precision) == parseFloat(d.latitude).toFixed(decimal_precision) && du.longitude.toFixed(decimal_precision) == parseFloat(d.longitude).toFixed(decimal_precision)){
								duplicate_flag = true;
								this.coordinates[i].pointCount++;
							}
						});
						if(!duplicate_flag && !isNaN(parseFloat(d.longitude))){
							this.coordinates.push(
							{
								"place_guess": d.place_guess,
								"longitude": parseFloat(d.longitude),
								"latitude": parseFloat(d.latitude),
								"pointCount": 1
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
			var places = this.spatialData();
			var g = svg.append("g");

			console.log(places);
			

			Promise.all([worldmap, places]).then(function(values){
			    g.selectAll("path")
			        .data(values[0].features)
			        .enter()
			        .append("path")
				        .attr("class","continent")
				        .attr("fill","none")
				        .attr("stroke","green")
				        .attr("d", path),

			    g.selectAll("circle")
			        .data(values[1])
			        .enter()
			        .append("circle")
				        .attr("class","circles")
				        .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
				        .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
				        // .attr("r", (d) => d.pointCount*0.5 + "px")
				        .attr("r", 2)
				        .on("mousemove", function(d){
					 		tooltip
						 		.style("left", d3.event.pageX + 20 + "px")
						 		.style("top", d3.event.pageY + 20 + "px")
						 		.style("display", "inline-block")
						 		.html(`${d.place_guess}<br>${d.pointCount} Observations`);
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
