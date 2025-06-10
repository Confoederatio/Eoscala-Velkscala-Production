//Initialise functions
{
	global.averageLUH2Rasters = function () {
		//Declare local instance variables
		var hyde_years = config.velkscala.hyde.hyde_years;
		var luh2_config = config.velkscala.luh2;

		//Iterate over all hyde_years
		for (var i = luh2_config.luh2_domain[0]; i <= luh2_config.luh2_domain[1]; i++)
			if (hyde_years.includes(i)) try {
				var luh2_images = {};
				var luh2_stocks = config.velkscala.luh2.variables;
				var output_file_path = `${luh2_config.output_folder}/LUH2_${i}.png`;

				log.info(`Generating LUH2 raster for ${getHYDEYearName(i)} ..`);

				for (var x = 0; x < luh2_stocks.length; x++) try {
					var local_file_path = `${luh2_config.input_folder}${luh2_config.file_prefix}${luh2_stocks[x]}/output_folder/${luh2_config.file_prefix}${luh2_stocks[x]}_${i}.png`;

					luh2_images[luh2_stocks[x]] = loadNumberRasterImage(local_file_path, {
						type: "greyscale"
					});
				} catch (e) {
					log.warn(`- Failed to load ${luh2_stocks[x]} into memory for ${i}.`);
				}

				log.info(`- Averaging LUH2 raster for ${i} ..`);
				saveNumberRasterImage({
					file_path: output_file_path,
					height: luh2_images[luh2_stocks[0]].height,
					width: luh2_images[luh2_stocks[0]].width,
					function: function (arg0_index) {
						//Convert from parameters
						var index = arg0_index;

						//Declare local instance variables
						var local_sum = 0;

						//Average all luh2_images
						for (var x = 0; x < luh2_stocks.length; x++) {
							var local_value = luh2_images[luh2_stocks[x]].data[index];

							local_sum += local_value;
						}

						//Return statement
						return local_sum/luh2_stocks.length;
					}
				});

				log.info(`- File written to ${output_file_path}.`);
			} catch (e) { console.error(e); }
	};

	global.generateKK10_LUH2Rasters = function () {

	};

	global.scaleKK10_LUH2Rasters = function () {

	};
}