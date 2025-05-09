# Import local project files
source("./R_statistical_visualisation/rasters/global_3d_map_data_framework.R")
source("./R_statistical_visualisation/rasters/regions_3d_map_data_framework.R")
  land_sea <- get_land_sea_definitions()
  regions <- get_region_definitions()

# Plot functions
region_camera_zoom_outs <- list(
  northern_america = 3,
  latin_america = 3,
  europe = 1.5,
  eastern_europe_and_russia = 2.4,
  central_asia = 3,
  middle_east = 2,
  maghreb_egypt = 2.5,
  sub_saharan_africa = 3.3,
  oceania = 2.8,
  indian_subcontinent = 2,
  southeast_asia = 2.2,
  eastasia = 2,

  land = 3
)
region_options <- list(
  northern_america = list(),
  latin_america = list(),
  europe = list(
    x = 1261,
    y = 9,
    width = 1339,
    height = 747,

    angle = "NW",
    pan_x = 0.5
  ),
  eastern_europe_and_russia = list(
    x = 2333,
    y = 106,
    width = 1987,
    height = 492,
    pan_x = -0.5
  ),
  central_asia = list(),
  middle_east = list(
    angle = "NW"
  ),
  maghreb_egypt = list(
    angle = "NW"
  ),
  sub_saharan_africa = list(
    angle = "NW"
  ),
  oceania = list(
    x = 3488,
    y = 1115,
    width = 832,
    height = 563,

    angle = "NW",
    pan_x = 0.5
  ),
  indian_subcontinent = list(
    angle = "NW"
  ),
  southeast_asia = list(
    angle = "NW"
  ),
  eastasia = list(
    angle = "NW"
  ),
  land = list(
    angle = "NE"
  )
)

generate_gdp_ppp_map <- function (arg0_year, arg1_options = list()) {
  # Convert from parameters
  region_key = "land"
  year <- arg0_year
  options <- arg1_options

  # Declare local instance variables
  exponent_label <- if (!is.null(options$scaling) && !is.na(options$scaling)) paste0(options$scaling) else paste0("0.4")
  year_label <- if (year < 0) paste0(abs(year), "BC") else paste0(year, "AD")

  gdp_ppp_path <- sprintf("./output/eoscala/GDP_PPP/gdp_ppp_%d.png", year)
  generate_global_3d_map(
    data_png_path = gdp_ppp_path,
    region_key = region_key,
    options = c(list(
      name = paste0("GDP (SDR-Adjusted PPP), Logarithmic Scale ^", exponent_label, "<br>", land_sea[[region_key]]$name, ", ", year_label),

      scaling = 0.4,
      x_axis_label = "Longitude, 5 arc-minutes",
      y_axis_label = "Latitude, 5 arc-minutes",
      z_axis_label = "GDP (SDR-Adjusted PPP), 2000$, 100s",
      z_label_prefix = "$",
      z_scalar = 100, # GDP is in 100s

      camera_zoom_out = region_camera_zoom_outs[[region_key]]
    ), options)
  )
}
generate_gdp_ppp_3d_region_map <- function (arg0_region_key, arg1_year, arg2_options = list()) {
  # Convert from parameters
  region_key <- arg0_region_key
  year <- arg1_year
  options <- arg2_options

  # Declare local instance variables
  exponent_label <- if (!is.null(options$scaling) && !is.na(options$scaling)) paste0(options$scaling) else paste0("0.4")
  year_label <- if (year < 0) paste0(abs(year), "BC") else paste0(year, "AD")

  gdp_ppp_path <- sprintf("./output/eoscala/GDP_PPP/gdp_ppp_%d.png", year)
  generate_region_3d_map(
    data_png_path = gdp_ppp_path,
    region_key = region_key,
    options = c(list(
      name = paste0("GDP (SDR-Adjusted PPP), Logarithmic Scale ^", exponent_label, "<br>", regions[[region_key]]$name, ", ", year_label),

      scaling = 0.4,
      x_axis_label = "Longitude, 5 arc-minutes",
      y_axis_label = "Latitude, 5 arc-minutes",
      z_axis_label = "GDP (SDR-Adjusted PPP), 2000$, 100s",
      z_label_prefix = "$",
      z_scalar = 100, # GDP is in 100s

      camera_zoom_out = region_camera_zoom_outs[[region_key]]
    ), options)
  )
}

#generate_gdp_ppp_3d_region_map("northern_america", 2022, region_options$northern_america)
generate_gdp_ppp_3d_region_map("latin_america", 1400, region_options$latin_america)
#generate_gdp_ppp_3d_region_map("europe", 100, region_options$europe)
#generate_gdp_ppp_3d_region_map("eastern_europe_and_russia", 1400, region_options$eastern_europe_and_russia)
#generate_gdp_ppp_3d_region_map("central_asia", 1850, region_options$central_asia)
#generate_gdp_ppp_3d_region_map("middle_east", -8000, region_options$middle_east)
#generate_gdp_ppp_3d_region_map("maghreb_egypt", 1850, region_options$maghreb_egypt)
#generate_gdp_ppp_3d_region_map("sub_saharan_africa", 0, region_options$sub_saharan_africa)
#generate_gdp_ppp_3d_region_map("oceania", 1700, region_options$oceania)
#generate_gdp_ppp_3d_region_map("indian_subcontinent", 1850, region_options$indian_subcontinent)
#generate_gdp_ppp_3d_region_map("southeast_asia", 1850, region_options$southeast_asia)
#generate_gdp_ppp_3d_region_map("eastasia", 1850, region_options$eastasia)
#generate_gdp_ppp_map(1850, region_options$land)

# generate_gdp_ppp_3d_region_map("europe", -4000, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", -2000, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 0, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 500, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1000, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1500, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1600, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1750, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1800, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1850, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1870, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1900, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1930, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1950, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1960, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 1990, region_options$europe)
# generate_gdp_ppp_3d_region_map("europe", 2000, region_options$europe)
#generate_gdp_ppp_3d_region_map("europe", 2022, region_options$europe)

#generate_gdp_ppp_3d_region_map("eastasia", 1850, region_options$eastasia)
#generate_gdp_ppp_3d_region_map("eastasia", 1900, region_options$eastasia)
#generate_gdp_ppp_3d_region_map("eastasia", 1930, region_options$eastasia)
#generate_gdp_ppp_3d_region_map("eastasia", 1960, region_options$eastasia)
#generate_gdp_ppp_3d_region_map("eastasia", 1990, region_options$eastasia)
#generate_gdp_ppp_3d_region_map("eastasia", 2022, region_options$eastasia)
