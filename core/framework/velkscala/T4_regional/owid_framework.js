//Initialise functions
{
	/**
	 * getOWIDRegionsObject() - Returns an OWID data object with population entries in JSON form.
	 *
	 * @returns {Object}
	 */
	global.getOWIDRegionsObject = function () {
		//Declare local instance variables
		var owid_colourmap = FileManager.loadFileAsJSON(config.defines.common.input_file_paths.owid_colourmap);
		var owid_obj = FileManager.loadCSVAsJSON(config.defines.common.input_file_paths.owid_data, {
			mode: "vertical"
		});
		
		//Iterate over all_regions
		var all_regions = Object.keys(owid_obj);
		
		for (let i = 0; i < all_regions.length; i++) {
			var local_region = owid_obj[all_regions[i]];
			
			//Delete .Code, map years and population to numbers
			delete local_region["Code"];
			local_region["Year"] = local_region["Year"].map(Number);
			local_region["Population (historical)"] = local_region["Population (historical)"].map(Number);
			
			//Set local_region.key
			local_region.key = all_regions[i];
			
			if (owid_colourmap[all_regions[i]])
				local_region.colour = owid_colourmap[all_regions[i]].colour;
			if (local_region.colour)
				owid_obj[local_region.colour.join(",")] = local_region;
		}
		
		//Process .Year, .Population arrays into objects
		for (let i = 0; i < all_regions.length; i++) {
			var local_region = owid_obj[all_regions[i]];
			
			//Set .population object
			var local_population = {};
			
			//Iterate over all .Year elements
			for (let x = 0; x < local_region.Year.length; x++)
				local_population[local_region.Year[x]] = returnSafeNumber(local_region["Population (historical)"][x]);
			
			//Delete un-necessary fields
			local_region.population = local_population;
			
			delete local_region["Population (historical)"];
			delete local_region.Year;
		}
		
		//Return statement
		return owid_obj;
	};
}