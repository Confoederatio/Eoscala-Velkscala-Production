//Initialise functions
{
	/**
	 * getOWIDRegionsObject() - Returns an OWID data object with population entries in JSON form.
	 *
	 * @returns {Object}
	 */
	global.getOWIDRegionsObject = function () {
		//Return statement
		return FileManager.loadCSVAsJSON(config.defines.common.input_file_paths.owid_data, { mode: "vertical" });
	};
}