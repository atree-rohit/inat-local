<template>
	<div class="text-center mt-3">
		<h1 class="text-4xl">Upload</h1>
		<section id="content">
			<input type="file" id="files" multiple @change="this.$root.handleFileSelect" class="btn btn-success" />
			<div id="file-info"></div>
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
		ahandleFileSelect: function(e) {
			this.$root.reader.addEventListener("load", this.parseFile, false);
			this.$root.reader.readAsText(e.target.files[0]);
		},

		aparseFile : function(){
			this.$root.csv_data = d3.csv(this.reader.result);
			this.$root.data_set = true;
		}
	}
};
</script>
