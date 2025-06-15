config.defines.common = {
  input_file_paths: {
    //Eoscala
    hyde_folder: `./input/velkscala/hyde/`,
      hyde_land_area: `./output/velkscala/hyde_metadata/land_area.png`,
    maddison_estimates: `./input/eoscala/maddison/maddison_gdp_ppp_2011$.json`,
    regional_subdivisions: `./input/eoscala/regional_subdivisions.png`,
    sedac_folder: `./input/eoscala/sedac/`,
    sedac_prefix: `./input/eoscala/sedac/SEDAC_`,
    world_bank_subdivisions: `./input/eoscala/world_bank/world_bank_subdivisions.png`,

    //Velkscala
    kk10luh2_folder: `./output/velkscala/KK10LUH2/`,
    kk10luh2_prefix: `KK10LUH2_`,
    mcevedy_data: `./input/velkscala/mcevedy/mcevedy_data.json`,
    mcevedy_subdivisions: `./input/velkscala/mcevedy/mcevedy_subdivisions.png`
  },
  output_file_paths: {
    //Eoscala
    OLS_nordhaus_gdp_ppp_prefix: `./output/eoscala/GDP_PPP/nordhaus_adjusted/nordhaus_adjusted_`,
    OLS_nordhaus_gdp_ppp_suffix: `_number.png`,
    OLS_potential_economic_activity_folder: `./output/eoscala/potential_economic_activity_data/`,
    OLS_potential_economic_activity_prefix: `./output/eoscala/potential_economic_activity/potential_economic_activity_`,
    OLS_potential_economic_activity_suffix: `_number.png`,
    OLS_potential_economic_activity_weights: `./output/eoscala/potential_economic_activity_data/processed_base_model.json`,
    potential_economic_activity_folder: `./output/eoscala/potential_economic_activity/`,
    regional_eoscala_file: `./output/eoscala/regional_gdp_ppp.json`,

    //Velkscala
    hyde_folder: `./output/velkscala/hyde_3.2/`
  }
};