import './bootstrap.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import * as d3 from 'd3';
import { in_states } from './in_state.js';

Vue.use(VueRouter);

let app = new Vue ({
	el: '#app',
	data: {
		reader: new FileReader(),
		csv_headers: null,
		data_set: false,
		csv_data: [],
		main_data: null,
		in_states: in_states
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
					"user": d.user_login,
					"observed_on": new Date(d.observed_on),
					"created_at": new Date(d.created_at),
					"updated_at": new Date(d.updated_at),
					"place_guess": d.place_guess,
					"latitude": +d.latitude,
					"longitude": +d.longitude,
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
