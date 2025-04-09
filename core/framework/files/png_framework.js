//Initialise functions
//[WIP] - Refactor everything
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

  global.getRGBAFromPixel = function (arg0_image_object, arg1_index) {
    //Convert from parameters
    var image_obj = (typeof arg0_image_object != "string") ? arg0_image_object : loadNumberRasterImage(arg0_image_object);
    var index = arg1_index;

    //Return RGBA
    return [
      image_obj.data[index],
      image_obj.data[index + 1],
      image_obj.data[index + 2],
      image_obj.data[index + 3]
    ];
  };

  global.loadNumberFromPixel = function (arg0_image_object, arg1_index) {
    //Convert from parameters
    var image_obj = (typeof arg0_image_object != "string") ? arg0_image_object : loadNumberRasterImage(arg0_image_object);
    var index = arg1_index;

    //Return statement
    return decodeRGBAAsNumber(getRGBAFromPixel(image_obj, index));
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
   * operateNumberRasterImage() - Runs an operation on a raster image for a file.
   * @param {Object} [arg0_options] 
   *  @param {String} [arg0_options.file_path] - The file path to save the image to.
   *  @param {Function} [arg0_options.function] - (arg0_index, arg1_number)
   */
  global.operateNumberRasterImage = function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Declare local instance variables
    var image_obj = loadNumberRasterImage(options.file_path);

    for (var i = 0; i < image_obj.data.length; i++)
      if (options.function)
        options.function(i, image_obj.data[i]);
  }

  /**
   * saveNumberRasterImage() - Saves a number raster image to a file.
   * @param {Object} [arg0_options]
   *  @param {String} [arg0_options.file_path] - The file path to save the image to.
   *  @param {Number} [arg0_options.width=1] - The width of the image to save.
   *  @param {Number} [arg0_options.height=1] - The height of the image to save.
   *  @param {Function} [arg0_options.function] - (arg0_index) - The function to apply to each pixel. Must return a number. [0, 0, 0, 0] if undefined.
   */
  global.saveNumberRasterImage = function (arg0_options) {
    //Convert from parameters
    var options = (arg0_options) ? arg0_options : {};

    //Initialise options
    options.height = returnSafeNumber(options.height, 1);
    options.width = returnSafeNumber(options.width, 1);

    //Declare local instance variables
    var png = new pngjs.PNG({
      height: options.height,
      width: options.width,
      filterType: -1
    });

    //Iterate over options.height; options.width
    for (var i = 0; i < options.height; i++)
      for (var x = 0; x < options.width; x++) {
        var local_index = (i*options.width + x)*4; //RGBA index

        saveNumberToPixel(image_obj, local_index, options.function(local_index));
      }

    //Write PNG file
    png.pack().pipe(fs.createWriteStream(options.file_path))

    //Return statement
    return {
      width: options.width,
      height: options.height,
      data: pixel_values
    };
  };

  global.saveNumberToPixel = function (arg0_image_object, arg1_index, arg2_number) {
    //Convert from parameters
    var image_obj = (typeof arg0_image_object != "string") ? arg0_image_object : loadNumberRasterImage(arg0_image_object);
    var index = arg1_index;
    var number = arg2_number;

    //Declare local instance variables
    var rgba = (number) ? 
      encodeNumberAsRGBA(number) : [0, 0, 0, 0];
    
    //Set pixel values
    image_obj.data[index] = rgba[0];
    image_obj.data[index + 1] = rgba[1];
    image_obj.data[index + 2] = rgba[2];
    image_obj.data[index + 3] = rgba[3];

    //Return statement
    return rgba;
  }
}
