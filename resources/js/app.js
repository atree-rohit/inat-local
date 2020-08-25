import './bootstrap.js';
import Vue from 'vue';
import VueOnsen from 'vue-onsenui';
import VueRouter from 'vue-router';
import routes from './routes';
import * as d3 from 'd3';
import { in_states } from './in_state.js';

Vue.use(VueRouter);
Vue.use(VueOnsen);


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
			this.enable_buttons();
		},
		enable_buttons: function (){
			const elements = document.querySelectorAll(".on-data-set");
			console.log("x");
			if(this.data_set){
				for (var i=0; i < elements.length; i++) {
					elements[i].setAttribute("class", "btn btn-lg btn-outline-info on-data-set");
				}
			}
			else {
				for (var i=0; i < elements.length; i++) {
					elements[i].setAttribute("class", "btn btn-lg btn-outline-danger disabled on-data-set");
				}
			}
		},

	},
	mounted() {
		this.enable_buttons();
	},

	router: new VueRouter(routes)
});
