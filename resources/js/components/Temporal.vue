<template>
	<div>
		<h1 class="text-4xl">Temporal</h1>
		<a href="#" @click="temporalData">Calculate</a>
		<div>
			{{ dates }}
		</div>
	</div>
</template>

<script>
import * as d3 from "d3";
export default{
	data() {
		return {
			dates: null,
			monthly_obv: null,
		}
	},

	methods: {
		temporalData() {
			var data = this.$root.csv_data;
			var op;
			var domain = new Array();
			var range;

			data.forEach(function (a) {
				domain.push(a[2]);

			});
				console.log(domain);
		}

	}
};
</script>
``
