//Initialise functions
{
  global.startup = function () {
    //Declare local instance variables
    var input_file_paths = config.defines.common.input_file_paths;
    var output_file_paths = config.defines.common.output_file_paths;
    var hyde_years = config.velkscala.hyde.hyde_years;
    var hyde_years_length = hyde_years.length;
    var hyde_years_index = 0;

    //Initialise main object
    main = {};
    main.hyde_years = hyde_years;
    main.hyde_years_length = hyde_years_length;
    main.hyde_years_index = hyde_years_index;

    //Load all files
    main.countries = getWorldBankSubdivisions();
    main.maddison_estimates = FileManager.loadFileAsJSON(input_file_paths.maddison_estimates);

    //[WIP] - You should load in GDP (PPP), population, and GDP (PPP) per capita for each country

    //Return statement
    return main;
  };
} 