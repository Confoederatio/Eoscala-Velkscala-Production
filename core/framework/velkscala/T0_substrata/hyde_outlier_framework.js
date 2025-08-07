//Initialise functions
{
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
	
	}
	
	global.removeOutliersForHYDEYear = function (arg0_year) { //[WIP] - Finish function body
	
	}
}