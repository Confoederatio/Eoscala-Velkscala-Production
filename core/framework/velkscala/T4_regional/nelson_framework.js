//Initialise functions
{
	/**
	 * getNelsonDataObject() - Returns a Nelson data object, unadjusted for population.
	 *
	 * @returns {Object}
	 */
	global.getNelsonDataObject = function () {
		//Return statement
		return FileManager.loadFileAsJSON(config.defines.common.input_file_paths.nelson_data);
	};

	/**
	 * getNelsonPopulationFromDiameter() - Fetches the likely Nelson population for a given circle's diameter.
	 * @param {number} arg0_diameter
	 * @param {Object} [arg1_options]
	 *  @param {Object} [arg1_options.nelson_obj] - Optimisation variable.
	 *
	 * @returns {number}
	 */
	global.getNelsonPopulationFromDiameter = function (arg0_diameter, arg1_options) {
		//Convert from parameters
		var diameter = arg0_diameter;
		var options = (arg1_options) ? arg1_options : {};

		//Declare local instance variables
		var nelson_obj = (options.nelson_obj) ? options.nelson_obj : getNelsonDataObject();

		//Determine the scale to use
		var all_scale_keys = Object.keys(nelson_obj.scale);
		var key_range = getKeyRange(nelson_obj.scale, arg0_diameter);

		if (key_range[0] == null) { //1. Use scale from 0 to first key
			var scale_per_px = nelson_obj.scale[key_range[1]]/parseFloat(key_range[1]);

			//Return statement
			return diameter*scale_per_px;
		} else if (key_range[1] == null) { //2. Use scale from before last key to last key
			var before_last_scale_key = all_scale_keys[all_scale_keys.length - 2];
			var before_last_scale_value = nelson_obj.scale[before_last_scale_key];
			var last_scale_key = all_scale_keys[all_scale_keys.length - 1];
			var last_scale_value = nelson_obj.scale[last_scale_key];

			var scale_per_px = (last_scale_value - before_last_scale_value)/(parseFloat(last_scale_key) - parseFloat(before_last_scale_key));

			//Return statement
			return (diameter - parseFloat(before_last_scale_key))*scale_per_px + before_last_scale_value;
		} else { //3. Use scale in between two keys
			var lower_value = nelson_obj.scale[key_range[0]];
			var upper_value = nelson_obj.scale[key_range[1]];

			var scale_per_px = (upper_value - lower_value)/(parseFloat(key_range[1]) - parseFloat(key_range[0]));

			//Return statement
			return (diameter - parseFloat(key_range[0]))*scale_per_px + lower_value;
		}
	};

	/**
	 * getNelsonPopulationObject() - Returns a processed Nelson population object.
	 *
	 * @returns {Object}
	 */
	global.getNelsonPopulationObject = function () {
		//Declare local instance variables
		var hyde_config = config.velkscala.hyde;
		var nelson_config = config.velkscala.nelson;
		var nelson_obj = getNelsonDataObject();

		//1. Interpolate config.velkscala.nelson.regions for all HYDE years within Nelson's domain
		var all_regions_keys = Object.keys(nelson_obj.regions);

		//Iterate over all_regions_keys
		for (var i = 0; i < all_regions_keys.length; i++) {
			var local_region = nelson_obj.regions[all_regions_keys[i]];

			//Interpolate regional .population figures
			local_region.population = cubicSplineInterpolationObject(local_region.population, {
				years: hyde_config.hyde_years
			});
		}

		//2. Convert diameter values to Nelson population figures
		for (var i = 0; i < all_regions_keys.length; i++) try {
			var local_region = nelson_obj.regions[all_regions_keys[i]];

			//Iterate over all_population_keys
			var all_population_keys = Object.keys(local_region.population);

			for (var x = 0; x < all_population_keys.length; x++) {
				var local_value = local_region.population[all_population_keys[x]];

				local_region.population[all_population_keys[x]] = getNelsonPopulationFromDiameter(local_value, {
					nelson_obj: nelson_obj
				});
			}
		} catch (e) {
			console.error(`Error when parsing ${all_regions_keys[i]}:`, e);
		}

		//Return statement
		return sortObjectByKey(nelson_obj, { type: "ascending"});
	};
}