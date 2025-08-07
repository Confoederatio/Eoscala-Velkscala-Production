abbreviate_number <- function(x, prefix = "") {
  abs_x <- abs(x)
  if (abs_x >= 1e12) {
    return(paste0(prefix, round(x / 1e12, 1), "T"))
  } else if (abs_x >= 1e9) {
    return(paste0(prefix, round(x / 1e9, 1), "B"))
  } else if (abs_x >= 1e6) {
    return(paste0(prefix, round(x / 1e6, 1), "M"))
  } else if (abs_x >= 1e3) {
    return(paste0(prefix, round(x / 1e3, 1), "K"))
  } else {
    return(paste0(prefix, round(x)))
  }
}
generate_log_ticks <- function(min_val, max_val, n = 6) {
  if (min_val <= 0) min_val <- 1  # avoid log(0)
  exp(seq(log(min_val), log(max_val), length.out = n))
}
get_land_sea_definitions <- function() {
  library(V8)
  regions_definitions_file <- "./common/eoscala/history/land_sea.js"
  ctx <- v8()
  ctx$eval("var config = {}; config.eoscala = {}; config.eoscala.history = {};")
  regions_js_content <- readLines(regions_definitions_file)
  ctx$eval(paste(regions_js_content, collapse = "\n"))
  ctx$get("config.eoscala.history.land_sea")
}
get_region_definitions <- function() {
  library(V8)
  regions_definitions_file <- "./common/eoscala/history/regions.js"
  ctx <- v8()
  ctx$eval("var config = {}; config.eoscala = {}; config.eoscala.history = {};")
  regions_js_content <- readLines(regions_definitions_file)
  ctx$eval(paste(regions_js_content, collapse = "\n"))
  ctx$get("config.eoscala.history.regions")
}
rgba_to_int <- function(rgba_vector) {
  # Ensure integer inputs for bitwise operations
  r <- as.integer(rgba_vector[1])
  g <- as.integer(rgba_vector[2])
  b <- as.integer(rgba_vector[3])
  a <- as.integer(rgba_vector[4])
  
  # Perform bit shifts and combine using bitwise OR
  # Note: R's bitwise operations work on signed 32-bit integers.
  # We need to handle potential negative results if the most significant bit is 1.
  val <- bitwOr(bitwOr(bitwOr(bitwShiftL(r, 24), bitwShiftL(g, 16)), bitwShiftL(b, 8)), a)
  
  # If the result is negative (due to signed integer interpretation),
  # add 2^32 to get the correct unsigned 32-bit representation.
  # Use numeric calculation for 2^32 to avoid integer overflow.
  if (!is.na(val) && val < 0) {
    val <- val + 2^32
  }
  
  # Handle potential NA values from bitwise operations if input was weird
  if (is.na(val)) {
    return(0L) # Return 0 or NA as appropriate for your context
  }
  
  return(as.numeric(val)) # Return as numeric to avoid potential downstream integer issues
}


generate_region_3d_map <- function(data_png_path, region_key, options = list()) {
  library(png)
  library(plotly)
  library(V8)
  
  # Default options
  opts <- modifyList(list(
    name = "3D Map",
    prefix = "",
    scaling = 0.4,
    x_axis_label = "Longitude (px)",
    y_axis_label = "Latitude (px)",
    z_axis_label = "GDP Surface Height (scaled)",
    z_scalar = 1,
    z_label_prefix = "",
    camera_zoom_out = 3,
    pan_x = 0,
    pan_y = 0,
    pan_z = 0
  ), options)
  
  region_mask_file <- "./input/eoscala/regional_subdivisions.png"
  regions_definitions_file <- "./common/eoscala/history/regions.js"
  
  cat("Loading region definitions from:", regions_definitions_file, "\n")
  ctx <- v8()
  ctx$eval("var config = {}; config.eoscala = {}; config.eoscala.history = {};")
  regions_js_content <- readLines(regions_definitions_file)
  ctx$eval(paste(regions_js_content, collapse = "\n"))
  regions_data <- ctx$get("config.eoscala.history.regions")
  region_info <- regions_data[[region_key]]
  if (is.null(region_info)) stop(paste("Region key", region_key, "not found."))
  
  cat("Target Region:", region_info$name, "\n")
  target_rgba <- c(region_info$colour, 255)
  cat("Target RGBA:", paste(target_rgba, collapse = ", "), "\n")
  
  cat("Loading data PNG:", data_png_path, "\n")
  data_img <- readPNG(data_png_path)
  cat("Loading region mask PNG:", region_mask_file, "\n")
  region_img <- readPNG(region_mask_file)
  
  dim_data <- dim(data_img)
  dim_region <- dim(region_img)
  if (!identical(dim_data[1:2], dim_region[1:2])) stop("Image dimensions mismatch.")
  
  height <- dim_data[1]
  width <- dim_data[2]
  cat("Image Dimensions (Height x Width):", height, "x", width, "\n")
  
  heightmap <- matrix(0.0, nrow = height, ncol = width)
  mask <- matrix(0L, nrow = height, ncol = width)
  
  cat("Processing pixels...\n")
  active_pixels_count <- 0
  for (i in 1:height) {
    for (j in 1:width) {
      region_px_raw <- region_img[i, j, ] * 255
      region_match <- all(abs(region_px_raw[1:3] - target_rgba[1:3]) <= 3)
      if (region_match) {
        mask[i, j] <- 1L
        active_pixels_count <- active_pixels_count + 1
        data_px <- c(data_img[i, j, 1:3], ifelse(dim_data[3] == 4, data_img[i, j, 4], 1.0)) * 255
        heightmap[i, j] <- rgba_to_int(data_px)
      }
    }
    if (i %% 100 == 0) cat("  Processed row", i, "/", height, "\n")
  }
  cat("Finished processing pixels.\n")
  cat("Active pixels in region mask:", active_pixels_count, "\n")
  
  # Outlier filtering
  get_neighbor_avg <- function(mat, i, j, height, width) {
    neighbors <- c()
    for (di in -1:1) {
      for (dj in -1:1) {
        if (di == 0 && dj == 0) next
        ni <- i + di
        nj <- j + dj
        if (ni >= 1 && ni <= height && nj >= 1 && nj <= width && mask[ni, nj] == 1) {
          neighbors <- c(neighbors, mat[ni, nj])
        }
      }
    }
    if (length(neighbors) > 0) mean(neighbors) else NA_real_
  }
  
  filtered_heightmap <- heightmap
  outlier_count <- 0
  for (i in 2:(height - 1)) {
    for (j in 2:(width - 1)) {
      if (mask[i, j] == 1L) {
        neighbor_avg <- get_neighbor_avg(heightmap, i, j, height, width)
        if (!is.na(neighbor_avg) && neighbor_avg > 0 &&
            heightmap[i, j] > 8*neighbor_avg) { # Remove outliers 8x greater than the average of its neighbours
          filtered_heightmap[i, j] <- neighbor_avg
          outlier_count <- outlier_count + 1
        }
      }
    }
  }
  cat("Outliers corrected:", outlier_count, "\n")
  heightmap <- filtered_heightmap
  
  z_matrix_final <- matrix(NA_real_, nrow = height, ncol = width)
  mask_indices <- which(mask == 1L)
  max_val <- max(heightmap[mask_indices])
  min_val <- min(heightmap[mask_indices])
  cat("Heightmap range:", min_val, "-", max_val, "\n")
  
  scaled_vals <- (heightmap[mask_indices]) ^ opts$scaling
  min_scaled <- min(scaled_vals)
  max_scaled <- max(scaled_vals)
  z_matrix_final[mask_indices] <- ((scaled_vals - min_scaled) / (max_scaled - min_scaled)) * 100
  
  # BOUNDING BOX SELECTION
  bbox_keys <- c("x", "y", "width", "height")
  has_bbox <- all(bbox_keys %in% names(opts)) && all(sapply(opts[bbox_keys], is.numeric))
  
  if (has_bbox) {
    x0 <- max(1, as.integer(opts$x))
    y0 <- max(1, as.integer(opts$y))
    x1 <- min(width, x0 + as.integer(opts$width) - 1)
    y1 <- min(height, y0 + as.integer(opts$height) - 1)
  } else {
    non_na_positions <- which(!is.na(z_matrix_final), arr.ind = TRUE)
    y0 <- max(1, min(non_na_positions[, 1]) - 5)
    y1 <- min(height, max(non_na_positions[, 1]) + 5)
    x0 <- max(1, min(non_na_positions[, 2]) - 5)
    x1 <- min(width, max(non_na_positions[, 2]) + 5)
  }
  
  z_region <- z_matrix_final[y0:y1, x0:x1]
  x_coords <- x0:x1
  y_coords <- y0:y1
  
  gdp_vals <- heightmap[mask_indices] * opts$z_scalar
  min_gdp <- min(gdp_vals, na.rm = TRUE)
  max_gdp <- max(gdp_vals, na.rm = TRUE)
  
  valid_min_gdp <- max(min_gdp, opts$z_scalar)  # Enforce at least $100
  tick_positions <- seq(0, 100, by = 10)
  
  tick_labels <- sapply(tick_positions, function(z) {
    scaled_val <- min_scaled + (z / 100) * (max_scaled - min_scaled)
    raw_val <- scaled_val ^ (1 / opts$scaling)
    abbreviate_number(raw_val * opts$z_scalar, prefix = opts$z_label_prefix)
  })
  print(data.frame(
    z_pos = tick_positions,
    scaled = min_scaled + (tick_positions / 100) * (max_scaled - min_scaled),
    raw_gdp = (min_scaled + (tick_positions / 100) * (max_scaled - min_scaled)) ^ (1 / opts$scaling),
    label = tick_labels
  ))
  
  col2hex <- function(colname) {
    rgb_vals <- col2rgb(colname) / 255
    rgb(rgb_vals[1], rgb_vals[2], rgb_vals[3])
  }
  
  r_colors <- c(
    "lightgrey", "darkgreen", "green4", "seagreen", "forestgreen", "lightgreen",
    "darkolivegreen1", "greenyellow", "yellow", "gold", "darkgoldenrod1", "orange",
    "darkorange", "darkorange1", "chocolate1", "coral", "brown2", "red"
  )
  hex_colors <- sapply(r_colors, col2hex)
  positions <- c(0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.1, 0.12, 0.14, 0.16, 0.18,
                 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 1)
  
  z_vals <- z_region
  z_vals[is.na(z_vals)] <- 0
  x_span <- diff(range(x_coords))
  y_span <- diff(range(y_coords))
  z_span <- max(z_vals, na.rm = TRUE) - min(z_vals, na.rm = TRUE)
  
  # FIXED CAMERA ANGLE MAPPING (restored behavior)
  angle_map <- list(
    NE = list(x = -1, y = -1, z = 1),
    NW = list(x =  1, y = -1, z = 1),
    SE = list(x = -1, y =  1, z = 1),
    SW = list(x =  1, y =  1, z = 1)
  )
  angle_key <- if (!is.null(opts$angle)) toupper(opts$angle) else "NE"
  eye_dir <- angle_map[[angle_key]]
  if (is.null(eye_dir)) eye_dir <- angle_map[["NE"]]
  camera_eye <- list(
    x = eye_dir$x * opts$camera_zoom_out,
    y = eye_dir$y * opts$camera_zoom_out,
    z = eye_dir$z * opts$camera_zoom_out
  )
  
  cat("Generating Plotly surface plot...\n")
  plot_ly(
    x = ~x_coords,
    y = ~y_coords,
    z = ~z_region,
    type = "surface",
    connectgaps = FALSE,
    colorscale = Map(function(pos, col) list(pos, col), positions, hex_colors),
    showscale = TRUE,
    surfacecolor = ~z_region,
    hoverinfo = 'x+y+z',
    colorbar = list(
      title = list(
        text = paste0(opts$z_axis_label, "\n\n⠀"),
        font = list(size = 12)
      ),
      tickvals = tick_positions,
      ticktext = tick_labels,
      tickmode = "array"
    )
  ) %>%
    layout(
      title = opts$name,
      scene = list(
        camera = list(
          eye = camera_eye,
          center = list(
            x = opts$pan_x,
            y = opts$pan_y,
            z = opts$pan_z
          ),
          projection = list(type = 'perspective')
        ),
        xaxis = list(title = opts$x_axis_label),
        yaxis = list(title = opts$y_axis_label, autorange = "reversed"),
        zaxis = list(
          title = list(
            text = opts$z_axis_label,
            font = list(size = 12)
          ),
          tickfont = list(size = 10)
        ),
        aspectmode = "data",
        aspectratio = list(x = x_span, y = y_span, z = z_span)
      ),
      margin = list(l = 65, r = 50, b = 65, t = 90)
    )
}
