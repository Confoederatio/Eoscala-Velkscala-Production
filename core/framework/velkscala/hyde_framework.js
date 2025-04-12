//Initialise functions
{
  global.getHYDEYearName = function (arg0_year) {
    //Convert from parameters
    var year = parseInt(arg0_year);

    //Return statement
    return `${Math.abs(year)}${(year >= 0) ? "AD" : "BC"}`;
  };

  /**
   * generateHYDEYearRaster() - Fills in missing HYDE years by performing linear or polynomial interpolation.
   * @param {number} arg0_year - The year to generate the raster set for.
   * @param {Object} [arg1_options]
   *  @param {Array<String>} [arg1_options.hyde_keys] - The keys to generate the raster set for. All by default.
   *  @param {String} [arg1_options.mode="linear"] - The mode to use for interpolation. Either 'linear' or 'polynomial'.
   *  @param {boolean} [arg1_options.skip_file_if_it_exists=false] - Whether to skip the file if it already exists.
   */
  global.generateHYDEYearRaster = function (arg0_year, arg1_options) { //[WIP] - Finish function body
    //Convert from parameters
    var year = parseInt(arg0_year);
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var actual_hyde_years = config.velkscala.hyde.actual_hyde_years;
    var hyde_dictionary = config.velkscala.hyde.hyde_dictionary;
    var hyde_domain = findDomain(actual_hyde_years, year);

    //Iterate over all keys in hyde_dictionary and perform linear interpolation
    var all_hyde_keys = (options.hyde_keys) ? 
      getList(options.hyde_keys) : Object.keys(hyde_dictionary);

    log.info(`Generating Rasters for year ..`);
    for (var i = 0; i < all_hyde_keys.length; i++) {
      var local_left_image_path = `${config.defines.common.output_file_paths.hyde_folder}${all_hyde_keys[i]}${getHYDEYearName(hyde_domain[0])}_number.png`;
      var local_right_image_path = `${config.defines.common.output_file_paths.hyde_folder}${all_hyde_keys[i]}${getHYDEYearName(hyde_domain[1])}_number.png`;

      var local_left_image = loadNumberRasterImage(local_left_image_path);
      var local_right_image = loadNumberRasterImage(local_right_image_path);

      var local_number_output_file_path = `${config.defines.common.output_file_paths.hyde_folder}${all_hyde_keys[i]}${getHYDEYearName(year)}_number.png`;
      var local_percentage_output_file_path = `${config.defines.common.output_file_paths.hyde_folder}${all_hyde_keys[i]}${getHYDEYearName(year)}_percentage.png`;
      var skip_file = false;
        if (options.skip_file_if_it_exists)
          skip_file = fs.existsSync(local_number_output_file_path);

      log.info(`- Saving ${all_hyde_keys[i]}`);

      if (!skip_file)
        saveNumberRasterImage({
          file_path: local_number_output_file_path,
          width: local_left_image.width,
          height: local_left_image.height,
          function: function (arg0_index) {
            //Convert from parameters
            var local_index = arg0_index;
            
            //Interpolate growth rate between left and right images at pixel value
            var left_number = local_left_image.data[local_index];
            var right_number = local_right_image.data[local_index];

            var local_value = Math.round(linearInterpolation([hyde_domain[0], hyde_domain[1]], [left_number, right_number], year));
              if (local_value < 0) local_value = 0;

            //Return statement
            return local_value;
          }
        });
      savePercentageRasterImage(local_number_output_file_path, local_percentage_output_file_path);
    }
  };

  global.generateHYDEYearPercentageRaster = function (arg0_year) {
    //Convert from parameters
  };

  global.loadHYDEConfig = function () {
    //Declare local instance variables
    var hyde_obj = config.velkscala.hyde;

    hyde_obj.maximum_hyde_year = Math.max(...hyde_obj.hyde_years);
    hyde_obj.maximum_actual_hyde_year = Math.max(...hyde_obj.actual_hyde_years);
    hyde_obj.minimum_hyde_year = Math.min(...hyde_obj.hyde_years);
    hyde_obj.minimum_actual_hyde_year = Math.min(...hyde_obj.actual_hyde_years);
  };
}
