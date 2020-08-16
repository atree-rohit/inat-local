<template>
	<div>
		<h1 class="text-4xl">Upload</h1>

		<section id="content">
			
			<input type="file" id="files" multiple />
			<hr />
			<h2>FileInfo</h2>
			<div id="file-info"></div>
			<hr />
			<h2>Result</h2>
			<textarea id="result" style="height: 250px;" cols="20"></textarea>
		</section>
		
	</div>
</template>

<script>
	export default{
		data () {
			return {
				results: []
			}
		},
		methods : {
			printStats: function(msg) {
				if (msg)
					console.log(msg);
				console.log("       Time:", (end-start || "(Unknown; your browser does not support the Performance API)"), "ms");
				console.log("  Row count:", rowCount);
				if (stepped)
					console.log("    Stepped:", stepped);
				console.log("     Errors:", errorCount);
				if (errorCount)
					console.log("First error:", firstError);
			},

			buildConfig: function (){
				return {
					delimiter: $('#delimiter').val(),
					header: $('#header').prop('checked'),
					dynamicTyping: $('#dynamicTyping').prop('checked'),
					skipEmptyLines: $('#skipEmptyLines').prop('checked'),
					preview: parseInt($('#preview').val() || 0),
					step: $('#stream').prop('checked') ? stepFn : undefined,
					encoding: $('#encoding').val(),
					worker: $('#worker').prop('checked'),
					comments: $('#comments').val(),
						// complete: completeFn,
					complete: function(data) {
						results = data.data
						console.log(results)
					},
					error: errorFn,
					download: false
				};
			},

			completeFn: function (results){
				if (results && results.errors)
				{
					if (results.errors)
					{
						errorCount = results.errors.length;
						firstError = results.errors[0];
					}
					if (results.data && results.data.length > 0)
						rowCount = results.data.length;
				}

				console.log("    Results:", results);

			},

			errorFn: function (err, file){
				end = now();
				console.log("ERROR:", err, file);
				enableButton();
			}

		},
		mounted() {
			var inputType = "local";
			var stepped = 0, rowCount = 0, errorCount = 0, firstError;
			var start, end;
			var firstRun = true;
			var maxUnparseLength = 10000;
			var results;
			
				$('#files').change(function(){
					var config = this.buildConfig();


					var x = $('#files').parse({
						config: config
					});

				});

				


		}
	};
</script>