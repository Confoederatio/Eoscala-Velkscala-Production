//Initialise functions
{
	//averageLUH2Rasters() - Averages out all stocks in LUH2 rasters and outputs them to an anthropogenic_mean folder.
	global.averageLUH2Rasters = function () {
		//Declare local instance variables
		var hyde_years = config.velkscala.hyde.hyde_years;
		var luh2_config = config.velkscala.luh2;

		//Iterate over all hyde_years
		for (var i = luh2_config.luh2_domain[0]; i <= luh2_config.luh2_domain[1]; i++)
			if (hyde_years.includes(i)) try {
				var luh2_images = {};
				var luh2_stocks = config.velkscala.luh2.variables;
				var output_file_path = `${luh2_config.output_folder}/${luh2_config.file_prefix}{i}.png`;

				log.info(`Generating LUH2 raster for ${getHYDEYearName(i)} ..`);

				for (var x = 0; x < luh2_stocks.length; x++) try {
					var local_file_path = `${luh2_config.input_folder}${luh2_stocks[x]}/output_folder/${luh2_config.file_prefix}${luh2_stocks[x]}_${i}.png`;

					log.info(`- Loading ${local_file_path} ..`);
					luh2_images[luh2_stocks[x]] = loadNumberRasterImage(local_file_path, {
						type: "greyscale"
					});
				} catch (e) {
					log.warn(`- Failed to load ${luh2_stocks[x]} into memory for ${i}.`);
				}

				log.info(`- Averaging LUH2 raster for ${i} ..`);
				saveNumberRasterImage({
					file_path: output_file_path,
					type: "greyscale",

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

	//generateKK10_LUH2Rasters() - Generates average rasters for both KK10 and LUH2 up to the limit of their respective domains over all HYDE years.
	global.generateKK10_LUH2Rasters = function () {
		//Declare local instance variables
		var common_defines = config.defines.common;
		var hyde_years = config.velkscala.hyde.hyde_years;
		var kk10_config = config.velkscala.kk10;
		var luh2_config = config.velkscala.luh2;

		//Iterate over all hyde_years
		for (var i = 0; i < hyde_years.length; i++) try {
			var in_luh2_domain = (hyde_years[i] >= luh2_config.luh2_domain[0] && hyde_years[i] <= luh2_config.luh2_domain[1]);
			var in_kk10_domain = (hyde_years[i] >= kk10_config.kk10_domain[0] && hyde_years[i] <= kk10_config.kk10_domain[1]);
			var output_file_path = `${common_defines.kk10luh2_folder}/${common_defines.kk10luh2_prefix}${hyde_years[i]}.png`;

			if (in_luh2_domain || in_kk10_domain) {
				//1. If this is an intersection of both the luh2_domain and kk10_domain; average rasters
				var luh2_file_path = `${luh2_config.output_folder}/${luh2_config.file_prefix}${hyde_years[i]}.png`;
				var kk10_file_path = `${kk10_config.input_folder}/${kk10_config.file_prefix}${hyde_years[i]}.png`;

				if (in_luh2_domain && in_kk10_domain) {
					var luh2_image = loadNumberRasterImage(luh2_file_path, { type: "greyscale" });
					var kk10_image = loadNumberRasterImage(kk10_file_path, { type: "greyscale" });

					log.info(`- Averaging KK10 and LUH2 for ${hyde_years[i]} ..`);
					saveNumberRasterImage({
						file_path: output_file_path,
						type: "greyscale",

						height: luh2_image.height,
						width: luh2_image.width,
						function: function (arg0_index) {
							//Convert from parameters
							var index = arg0_index;

							//Return statement
							return (kk10_image.data[index] + luh2_image.data[index])/2;
						}
					});

					log.info(`- File written to ${output_file_path}.`);
					continue;
				}

				//2. If this is of only the kk10_domain; merely copy the kk10 raster to its destination
				if (in_kk10_domain && !in_luh2_domain) {
					fs.copyFileSync(kk10_file_path, output_file_path);
					continue;
				}

				//3. If this is of only the luh2_domain; merely copy the luh2 raster to its destination
				if (in_luh2_domain && !in_kk10_domain) {
					fs.copyFileSync(luh2_file_path, output_file_path);
					continue;
				}
			}
		} catch (e) { console.error(e); }
	};

	global.scaleKK10_LUH2RastersToGlobal = function () { //[WIP] - Finish function body

	};

	global.scaleKK10_LUH2RastersToRegional = function () { //[WIP] - Finish function body
		//1. Scale rasters to Nelson first
		

		//2. Scale rasters to OWID/HYDE second
	};
}