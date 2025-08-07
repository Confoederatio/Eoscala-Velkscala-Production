/*
//BACKUP trainHYDESEDAC() for base divergent models (SUPER UNSTABLE - BUT ESTABLISHES GEOMEAN BASELINE)
global.trainBaselineHYDESEDAC = async function (arg0_year) {
  //Convert from parameters
  var year = parseInt(arg0_year);

  //Declare local instance variables
  var hyde_dictionary = getHYDEDictionary();
  var { X, Y } = await loadHYDESEDACYear(year);

  var all_hyde_keys = Object.keys(hyde_dictionary);

  console.log(`Performing OLS for ${year} ..`);

  //1. Apply Ridge Regression to stabilise coefficients
  var X_matrix = mathjs.matrix(X);
  var Y_matrix = mathjs.matrix(Y);
  console.log(`- Computed preliminary matrices.`);

  var beta = ridgeRegression(X_matrix, Y_matrix, 1e-3); //Small lambda for stabilisation
  console.log(`- Applied Ridge Regression to stabilise coefficients.`);

  //2. Convert coefficients to JSON
  var coefficients = beta.toArray().flat();
  console.log(`- Computed coefficients.`);

  //Save model to JSON
  var model_data_obj = {
    year: year,
    coefficients: Object.fromEntries(all_hyde_keys.map((key, i) => [key, coefficients[i]]))
  };
  var output_file_path = `./output/OLS_base_model_data/base_model_${year}.json`;

  fs.writeFileSync(output_file_path, JSON.stringify(model_data_obj, null, 2));
  console.log(`Model data for ${year} saved successfully in ${output_file_path}.`);
};
*/
/*
//1. Scale rasters to Nelson first; if transparent, set value to zero
for (let i = 0; i < hyde_years.length; i++) {
	var local_input_file_path = `${common_defines.input_file_paths.kk10luh2_geopng_folder}/${common_defines.input_file_paths.kk10luh2_prefix}${hyde_years[i]}.png`;
	var local_input_raster = loadNumberRasterImage(local_input_file_path);
	var local_output_file_path = `${common_defines.input_file_paths.kk10luh2_nelson_folder}/${common_defines.input_file_paths.kk10luh2_prefix}nelson_${hyde_years[i]}.png`;
	
	//Adjust raster image to Nelson
	log.info(`- Standardising to Nelson for ${hyde_years[i]} ..`);
	if (fs.existsSync(local_input_file_path)) {
		var all_nelson_regions = Object.keys(nelson_obj);
		var local_nelson_obj = {};
		var local_nelson_scalars = {};
		
		//Populate local_nelson_obj
		operateNumberRasterImage({
			file_path: local_input_file_path,
			function: function (arg0_index, arg1_number) {
				//Convert from parameters
				var index = arg0_index;
				var number = arg1_number;
				
				//Declare local instance variables
				var byte_index = index*4;
				var local_region = Object.values(nelson_obj).find((local_obj) => (local_obj.colour.join(",") == [
					nelson_raster.data[byte_index],
					nelson_raster.data[byte_index + 1],
					nelson_raster.data[byte_index + 2]
				].join(",")));
				
				modifyValue(local_nelson_obj, local_region.key, number);
			}
		});
		
		//Iterate over all_nelson_regions; populate local_nelson_scalars
		for (let x = 0; x < all_nelson_regions.length; x++)
			local_nelson_scalars[all_nelson_regions[x]] = local_nelson_obj[all_nelson_regions[x]]/nelson_obj[all_nelson_regions[x]];
		
		saveNumberRasterImage({
			file_path: local_output_file_path,
			height: nelson_raster.height,
			width: nelson_raster.width,
			function: function (arg0_index) {
				//Convert from parameters
				var index = arg0_index;
				
				//Declare local instance variables
				var byte_index = index*4;
				var local_region = Object.values(nelson_obj).find((local_obj) => (local_obj.colour.join(",") == [
					nelson_raster.data[byte_index],
					nelson_raster.data[byte_index + 1],
					nelson_raster.data[byte_index + 2]
				].join(",")));
				var local_value = local_input_raster.data[index];
				
				//Adjust to Nelson if possible
				if (local_region) {
					local_value *= local_nelson_scalars[local_region.key];
				} else {
					local_value = 0;
				}
				
				//Return statement
				return local_value;
			}
		});
	}
}
 */