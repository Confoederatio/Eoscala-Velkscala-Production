//Initialise functions
{
  global.startup = function () {
    //Declare local instance variables
    var hyde_years = getHYDEYears();
    var hyde_years_length = hyde_years.length;
    var hyde_years_index = 0;

    //Initialise main object
    main = {};
    main.hyde_years = hyde_years;
    main.hyde_years_length = hyde_years_length;
    main.hyde_years_index = hyde_years_index;

    //Load all files
    main.countries = FileManager.loadFileAsJSON(`./geographic_datasets/world_bank_subdivisions_for_ppp_calculations/world_bank_subdivisions.json`);
    main.maddison_estimates = FileManager.loadFileAsJSON(`./economic_datasets/maddison/maddison_gdp_ppp_2011$.json`);

    //Initialise all calculations
    main.countries = getGDPPPPByCountry(main.countries);
    main.countries = getPopulationByCountry(main.countries);
    main.countries = getGDPPPPPerCapitaByCountry(main.countries);

    //Process all images
    processAllImages();

    //Return statement
    return main;
  };
} 