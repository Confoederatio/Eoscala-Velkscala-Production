//Initialise functions
{
  global.getMaddisonPopulation = function (arg0_year) {
    //Convert from parameters
    var year = parseInt(arg0_year);

    //Declare local instance variables
    var common_defines = config.defines.common;
    var hyde_population_file_path = `${common_defines.input_file_paths.hyde_folder}popc_${getHYDEYearName(year)}_number.png`;
    var world_bank_subdivisions_file_path = common_defines.input_file_paths.world_bank_subdivisions;

    var population_image = loadNumberRasterImage(hyde_population_file_path);
    var world_bank_subdivisions_image = loadWorldBankSubdivisions(world_bank_subdivisions_file_path).data;

    //Iterate over all pixels
    for (var i = 0; i < population_image.width*population_image.height; i++) {
      var local_index = i*4; //RGBA index
      var local_x = i % population_image.width;
      var local_y = Math.floor(i/population_image.width);

      var local_data = population_image.data[i];
      var local_country = getCountryObjectByRGB([
        world_bank_subdivisions_image[local_index],
        world_bank_subdivisions_image[local_index + 1],
        world_bank_subdivisions_image[local_index + 2]
      ]);

      if (local_country)
        if (!local_country.population) local_country.population = {};
        modifyValue(local_country.population, year.toString(), local_data);
    }
  };

  global.getMaddisonPopulations = function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var hyde_years = config.velkscala.hyde.hyde_years;

    //Iterate over all hyde_years
    for (var i = 0; i < hyde_years.length; i++) try {
      getMaddisonPopulation(hyde_years[i]);
      console.log(`Fetching Maddison population for ${hyde_years[i]} ..`);
    } catch (e) {
      console.error(e);
    }

    //Write to DB if enabled
    if (!options.do_not_save) {
      FileManager.save();
      console.log(`getMaddisonPopulation() - Saved current DB to default path.`);
    }
  };
}
