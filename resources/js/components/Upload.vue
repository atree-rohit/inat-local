<template>
	<div>
		<h1 class="text-4xl">Upload</h1>

		<section id="content">

			<input type="file" id="files" multiple @change="handleFileSelect" class="btn btn-green" />
			<hr />
			<h2>FileInfo</h2>
			<div id="file-info"></div>
			<hr />
			<button @click="populateTable" class="btn btn-blue">View Data</button>
			<div class="h-64 w-auto overflow-scroll">
			<table v-html="table_data" class='text-xs border-collapsea'></table>
			</div>
		</section>

	</div>
</template>

<script>
	import Papa from 'papaparse';
	export default{
		data () {
			return {
				table_data: null
			}
		},
		methods: {
			handleFileSelect: function(evt) {
				var file = evt.target.files[0];
				var vm = this;

				Papa.parse(file, {
					header: false,
					dynamicTyping: true,
					complete: function(data) {
						vm.$root.csv_data = data.data;
					}
				});
			},
			populateTable : function(){
				var i, j;
				var  op = "";
				var data = this.$root.csv_data;

				for( i=1 ; i<data.length ; i++ ){
					op += "<tr><td class='border border-black'>" + data[i].join("</td><td class='border border-black'>") + "</td></tr>";
				}
				this.table_data = "<thead class='bg-black text-white'><tr><td class='border border-white'>" + data[0].join("</td><td class='border border-white'>") + "</td></tr></thead><tbody>"+op+"</tbody>";
			}
		}
	};
</script>
