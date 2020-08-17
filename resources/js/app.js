import './bootstrap.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

Vue.use(VueRouter);

let app = new Vue ({
	el: '#app',
	data: {
		csv_data: null,
	},

	router: new VueRouter(routes)
});
