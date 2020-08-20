<template>
	<div>
		<h1 class="text-4xl">Upload</h1>

		<section id="content">

			<input type="file" id="files" multiple @change="handleFileSelect" class="btn btn-green" />
			<hr />
			<h2>FileInfo</h2>
			<div id="file-info"></div>
			<hr />
			<!-- <button @click="populateTable" class="btn btn-blue">View Data</button> -->
			<div class="h-64 w-auto overflow-scroll">
				<pre v-html="table_data" class="text-4xl"></pre>
			</div>
		</section>

	</div>
</template>

<script>
import * as d3 from 'd3';
export default{
	data () {
		return {
			table_data: null,
			reader: new FileReader()
		}
	},
	methods: {
		handleFileSelect: function(e) {
			this.reader.addEventListener("load", this.parseFile, false);
			this.reader.readAsText(e.target.files[0]);
		},

		parseFile : function(){
			this.$root.csv_data = d3.csv(this.reader.result);
			this.$root.data_set = true;
		}
	}
};
</script>
