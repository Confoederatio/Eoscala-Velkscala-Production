//Initialise functions
{
	/**
	 * getOWIDRegionsObject() - Returns an OWID data object with population entries in JSON form.
	 *
	 * @returns {Object}
	 */
	global.getOWIDRegionsObject = function () { //[WIP] - Finish function body
		//Declare local instance variables
		var owid_csv = fs.readFileSync(config.defines.common.input_file_paths.owid_data, "utf8");
		var return_obj = {};
		
		//Parse owid_csv string
	};
}