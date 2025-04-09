//Initialise functions
{
  global.getImageSum = function (arg0_file_path) {
    //Convert from parameters
    var file_path = arg0_file_path;

    //Declare local instance variables
    var image = loadNumberRasterImage(file_path);
    var total_sum = 0;

    //Iterate over image
    for (var i = 0; i < image.data.length; i++)
      total_sum += image.data[i];

    //Return statement
    return total_sum;
  };

  global.getRGBAFromPixel = function (arg0_image_object, arg1_x, arg2_y) {
    //Convert from parameters
    var image_obj = (typeof arg0_image_object != "string") ? arg0_image_object : loadNumberRasterImage(arg0_image_object);
    var x_coord = arg1_x;
    var y_coord = arg2_y;
    
    //Declare local instance variables
    var local_index = (y_coord*image_obj.width + x_coord)*4; //RGBA index

    //Return RGBA
    return [
      image_obj.data[local_index],
      image_obj.data[local_index + 1],
      image_obj.data[local_index + 2],
      image_obj.data[local_index + 3]
    ];
  };

  global.loadNumberFromPixel = function (arg0_image_object, arg1_x, arg2_y) {
    //Convert from parameters
    var image_obj = (typeof arg0_image_object != "string") ? arg0_image_object : loadNumberRasterImage(arg0_image_object);
    var x_coord = arg1_x;
    var y_coord = arg2_y;
    
    //Return statement
    return decodeRGBAAsNumber(getRGBAFromPixel(image_obj, x_coord, y_coord));
  };

  global.loadNumberRasterImage = function (arg0_file_path) {
    //Convert from parameters
    var file_path = arg0_file_path;

    //Declare local instance variables
    var rawdata = fs.readFileSync(file_path);
    var pixel_values = [];
    var png = pngjs.PNG.sync.read(rawdata);

    //Iterate over all pixels
    for (var i = 0; i < png.width*png.height; i++) {
      var colour_index = i*4;
      var colour_value = decodeRGBAAsNumber([
        png.data[colour_index],
        png.data[colour_index + 1],
        png.data[colour_index + 2],
        png.data[colour_index + 3]
      ]);

      pixel_values.push(colour_value);
    }

    //Return statement
    return { width: png.width, height: png.height, data: pixel_values };
  };

  /**
   * saveNumberRasterImage() - Saves a number raster image to a file.
   * @param {Object} [arg0_options]
   *  @param {String} [arg0_options.file_path] - The file path to save the image to.
   *  @param {Number} [arg0_options.width] - The width of the image to save.
   *  @param {Number} [arg0_options.height] - The height of the image to save.
   * 
   *  @param {Function} [arg0_options.function] - The function to apply to each pixel. Takes in parameters (x, y). Must return a number. [0, 0, 0, 0] if undefined.
   */
  global.saveNumberRasterImage = function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Initialise options
  };
}
