import './bootstrap.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import * as d3 from 'd3';

Vue.use(VueRouter);

let app = new Vue ({
	el: '#app',
	data: {
		reader: new FileReader(),
		csv_headers: null,
		data_set: false,
		csv_data: null,
		main_data: null,
		},
	methods: {
		handleFileSelect: function(e) {
			this.reader.addEventListener("load", this.parseFile, false);
			this.reader.readAsText(e.target.files[0]);
		},

		parseFile : function(){
			const op = [];
			d3.csvParse(this.reader.result).forEach((d) => {
				const x = {
					"id": +d.id,
					"observed_on": new Date(d.observed_on),
					"City": d.place_guess,
					"Latitude": +d.latitude,
					"Longitude": +d.longitude,
				};
				op.push(x);
			});
			this.csv_data = op;
			this.data_set = true;
		}
	},
	created() {
		// this.csv_data = d3.csv('csv/spiderIndia_21082020.csv');
		// this.csv_data = d3.csv('csv/x5804.csv');
		// this.csv_data = d3.csv('csv/b.csv');
		// this.data_set = true;
	},

	router: new VueRouter(routes)
});
