//Initialise functions
{
	global.getRasterNeighbourAverage = function (arg0_geopng_array, arg1_x, arg2_y, arg3_height, arg4_width) {
		//Convert from parameters
		var geopng_array = arg0_geopng_array;
		var local_x = arg1_x;
		var local_y = arg2_y;
		var height = arg3_height;
		var width = arg4_width;
		
		//Declare local instance variables
		var count = 0;
		var sum = 0;
		
		for (let i = -1; i <= 1; i++)
			for (let x = -1; x <= 1; x++) {
				if (i == 0 && x == 0) continue;
				
				let neighbour_x = local_x + i;
				let neighbour_y = local_y + x;
				
				if (neighbour_x >= 0 && neighbour_x < height && neighbour_y >= 0 && neighbour_y < width) {
					let local_index = neighbour_x*width + neighbour_y;
					let local_value = geopng_array[local_index];
					
					if (!isNaN(local_value)) {
						sum += local_value;
						count++;
					}
				}
			}
		
		//Return statement
		return (count > 0) ? sum/count : NaN;
	};
	
	/**
	 * Returns a list of all HYDE outlier mask files and their time domains.
	 *
	 * @returns {{
	 *   "<outlier_input_file_path>": {
	 *     file_path: string,
	 *
	 *     end_year: number,
	 *     start_year: number
	 *   }
	 * }}
	 */
	global.getHYDEOutlierMasksObject = function () { //[WIP] - Finish function body
		//Declare local instance variables
		var common_defines = config.defines.common;
		var hyde_outlier_folder = common_defines.input_file_paths.hyde_outlier_mask_folder;
		var return_obj = {};
		
		//Iterate over all_files and check for .png
		var all_files = fs.readdirSync(hyde_outlier_folder);
		
		for (let i = 0; i < all_files.length; i++) {
			var local_file_path = path.join(hyde_outlier_folder, all_files[i]);
			
			if (
				!fs.statSync(local_file_path).isDirectory() &&
				local_file_path.endsWith(".png")
			) {
				var split_file_name = local_file_path
					.replace(".png", "").split("_");
				
				if (split_file_name.length >= 2) {
					var end_year = parseInt(split_file_name[split_file_name.length - 1]);
					var start_year = parseInt(split_file_name[split_file_name.length - 2]);
					
					return_obj[local_file_path] = {
						file_path: local_file_path,
						end_year: end_year,
						start_year: start_year
					};
				} else {
					log.error(`${local_file_path} has less than 2 arguments. It must include a _<start_date>_<year_date> formatter as a suffix.`);
				}
			}
		}
		
		//Return statement
		return return_obj;
	};
	
	global.removeOutliersForHYDE = function () { //[WIP] - Finish function body
		//Declare local instance variables
		var hyde_years = config.velkscala.hyde.hyde_years;
		
		//Iterate over all hyde_years
		for (let i = 0; i < hyde_years.length; i++) try {
			log.info(`- Removing HYDE outliers for ${getHYDEYearName(hyde_years[i])} ..`);
			removeOutliersForHYDEYear(hyde_years[i]);
		} catch (e) { console.error(e); }
	}
	
	global.removeOutliersForHYDEYear = function (arg0_year) { //[WIP] - Finish function body
		//Convert from parameters
		var year = arg0_year;
		
		//Declare local instance variables
		var common_defines = config.defines.common;
		var fallback_file_path = `${common_defines.input_file_paths.kk10luh2_processed_folder}/${common_defines.input_file_paths.kk10luh2_prefix}processed_${year}.png`;
		var fallback_raster = loadNumberRasterImage(fallback_file_path);
		var hyde_input_file_path = `${common_defines.output_file_paths.hyde_folder}popc_${getHYDEYearName(year)}_number.png`;
		var hyde_output_file_path = `${common_defines.input_file_paths.hyde_outliers_processed}pop_${getHYDEYearName(year)}_number.png`;
		var hyde_outlier_masks = getHYDEOutlierMasksObject();
		var hyde_outlier_rasters = {};
		var hyde_pixel_outliers = []; //Indices detected as being outliers
		var hyde_raster = loadNumberRasterImage(hyde_input_file_path);
		
		//Iterate over all_hyde_outlier_masks; load hyde_outlier_rasters
		var all_hyde_outlier_masks = Object.keys(hyde_outlier_masks);
		
		for (let i = 0; i < all_hyde_outlier_masks.length; i++) {
			var local_outlier = hyde_outlier_masks[all_hyde_outlier_masks[i]];
			
			if (year >= local_outlier.start_year && year <= local_outlier.end_year)
				hyde_outlier_rasters[all_hyde_outlier_masks[i]] = loadImage(all_hyde_outlier_masks[i]);
		}
		
		//Operate over current image; check if number is an outlier compared to neighbouring pixels
		var outlier_count = 0;
		
		//Iterate over all pixels in hyde_raster, excluding border pixels
		for (let i = 1; i < hyde_raster.height - 1; i++)
			for (let x = 1; x < hyde_raster.width - 1; x++) {
				let local_index = i*hyde_raster.width + x;
				let neighbour_average = getRasterNeighbourAverage(hyde_raster.data, i, x, hyde_raster.height, hyde_raster.width);
				
				if (!isNaN(neighbour_average) && neighbour_average > 0 && hyde_raster.data[local_index] > 8*neighbour_average)
					hyde_pixel_outliers.push(local_index);
			}
		
		//Save number raster image
		saveNumberRasterImage({
			file_path: hyde_output_file_path,
			height: hyde_raster.height,
			width: hyde_raster.width,
			function: function (arg0_index) {
				//Convert from parameters
				var index = arg0_index;
				
				//Declare local instance variables
				var byte_index = index*4;
				var is_outlier = (hyde_pixel_outliers.includes(index));
				
				//Check if any of hyde_outlier_rasters contains [0, 0, 0] masking for this pixel
				if (!is_outlier) {
					var all_hyde_outlier_rasters = Object.keys(hyde_outlier_rasters);
					
					for (let i = 0; i < all_hyde_outlier_rasters.length; i++) {
						var local_raster = hyde_outlier_rasters[all_hyde_outlier_rasters[i]];
						var local_raster_colour = [
							local_raster.data[byte_index],
							local_raster.data[byte_index + 1],
							local_raster.data[byte_index + 2],
							local_raster.data[byte_index + 3]
						].join(",");
						
						//Break if outlier is detected
						if (local_raster_colour == "0,0,0,255") {
							is_outlier = true;
							break;
						}
					}
				}
				
				//If this pixel is an outlier, overwrite it with the equivalent content in fallback_image
				//Return statement
				if (is_outlier) {
					return fallback_raster.data[index];
				} else {
					return hyde_raster.data[index];
				}
			}
		});
	}
}