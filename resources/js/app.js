import './bootstrap.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import * as d3 from 'd3';

Vue.use(VueRouter);

let app = new Vue ({
	el: '#app',
	data: {
		csv_headers: null,
		data_set: false,
		csv_data: null,
		main_data: null
		},
	created() {
		this.csv_data = d3.csv('csv/a.csv');
		this.data_set = true;
	},

	router: new VueRouter(routes)
});
