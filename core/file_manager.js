module.exports = {
  getAllFiles: function (arg0_folder) {
    //Convert from parameters
    var folder = arg0_folder;

    //Declare local instance variables
    var file_array = [];

    try {
      var files = fs.readdirSync(folder);

      for (var i = 0; i < files.length; i++) {
        //Self-reference to fetch files in sub-directories
        local_dir_array = (fs.statSync(folder + "/" + files[i]).isDirectory()) ? module.exports.getAllFiles(folder + "/" + files[i]) : file_array.push(path.join(folder, "/", files[i]));

        //Add files from local_dir_array to file_array
        for (var x = 0; x < local_dir_array.length; x++) file_array.push(local_dir_array[x]);
      }
    } catch (e) {
      console.log(e);
    }

    //Return statement
    return file_array;
  },

  loadAllScripts: function () {
    //Declare local instance variables
    var loaded_files = [];

    //Load config backend files individually first
    var local_load_order = load_order.load_files;

    for (var i = 0; i < local_load_order.length; i++) {
      for (var x = 0; x < load_order.load_directories.length; x++) {
        var local_dir = load_order.load_directories[x];
        var all_directory_files = module.exports.getAllFiles(local_dir);

        for (var y = 0; y < all_directory_files.length; y++)
          if (all_directory_files[y].includes(local_load_order[i]))
            if (all_directory_files[y].endsWith(".js")) {
              module.exports.loadFile(all_directory_files[y]);
              loaded_files.push(local_load_order[i]);
              console.log(`Loaded imperative file ${all_directory_files[y]}.`);
            }
      }
    }

    //Load each load directory separately
    for (var i = 0; i < load_order.load_directories.length; i++) {
      var local_dir = load_order.load_directories[i];
      var all_directory_files = module.exports.getAllFiles(local_dir);

      for (var x = 0; x < all_directory_files.length; x++)
        if (!loaded_files.includes(all_directory_files[x]))
          if (all_directory_files[x].endsWith(".js")) {
            module.exports.loadFile(all_directory_files[x]);
            loaded_files.push(all_directory_files[x]);
          }
    }

    console.log(`Loaded ${loaded_files.length} files from ${load_order.load_directories.length} directories.`);
  },

  load: function (arg0_file_path) {
    //Convert from parameters
    var file_path = (arg0_file_path) ? arg0_file_path : "./database.json";

    //Declare main
    main = JSON.parse(fs.readFileSync(file_path, "utf8"));

    console.log(`Loaded main DB from ${file_path}`);
  },
  
  /**
   * loadCSVAsJSON() - Attempts to load a CSV file as a JSON object.
   * @param {string} arg0_file_path
   * @param {Object} [arg1_options]
   *  @param {string} [arg1_options.mode="vertical"] - Whether objects are decided vertically or horizontally. Vertical by default.
   */
  loadCSVAsJSON: function (arg0_file_path, arg1_options) {
    //Convert from parameters
    var file_path = arg0_file_path;
    var options = (arg1_options) ? arg1_options : {};
    
    //Initialise options
    if (!options.mode) options.mode = "vertical";
    
    //Declare local instance variables
    var csv_string = fs.readFileSync(file_path, "utf8");
    
    var csv_array = csv_string.trim().split(/\r?\n/); //Split into lines and trim whitespace
    var parsed_rows = csv_array.map(parseCSVLine);
    var return_obj = {};
    
    if (options.mode == "vertical") {
      //First row is the CSV header
      for (let i = 1; i < parsed_rows.length; i++) {
        if (!parsed_rows[i].length || !parsed_rows[i][0]) continue; //Internal guard clause for empty lines or missing key
        var local_key = parsed_rows[i][0];
        var local_obj = {};
        
        for (let x = 1; x < parsed_rows[0].length; x++)
          local_obj[parsed_rows[0][x]] = (parsed_rows[i][x] != undefined) ? parsed_rows[i][x] : undefined;
        return_obj[local_key] = local_obj;
      }
    } else if (options.mode == "horizontal") { //[WIP] - Refactor at a later date
      //First row: property names (first cell is empty or label)
      var property_names = parsed_rows[0];
      
      // For each column (after the first), create an object
      for (let col = 1; col < property_names.length; col++) {
        var key = property_names[col];
        var obj = {};
        for (let row = 1; row < parsed_rows.length; row++) {
          var row_label = parsed_rows[row][0];
          obj[row_label] = parsed_rows[row][col] !== undefined ? parsed_rows[row][col] : null;
        }
        return_obj[key] = obj;
      }
    }
    
    //Internal helper function for parsing CSV lines
    function parseCSVLine (arg0_line) {
      //Convert from parameters
      var line = arg0_line;
      
      //Declare local instance variables
      var current = "";
      var in_quotes = false;
      var result = [];
      
      //iterate over all characters in line
      for (let i = 0; i < line.length; i++)
        if (line[i] == '"' && (i == 0 || line[i - 1] != "\\")) {
          in_quotes = (!in_quotes);
        } else if (line[i] == "," && !in_quotes) {
          result.push(current.trim().replace(/^"|"$/g, "")
            .replace(/""/g, '"'));
          current = "";
        } else {
          current += line[i];
        }
      //Push end current
      result.push(current.trim().replace(/^"|"$/g, "")
        .replace(/""/g, '"'));
      
      //Return statement
      return result;
    }
    
    //Return statement
    return return_obj;
  },

  loadFile: function (arg0_file) {
    //Declare local instance variables
    var file_path = path.join(__dirname, "..", arg0_file);

    //Evaluate file contents
    try {
      var rawdata = fs.readFileSync(file_path);
      eval(rawdata.toString());
    } catch (e) {
      console.error(`Failed to load ${file_path}.`);
      console.error(e);
    }
  },

  loadFileAsJSON: function (arg0_file_path) {
    //Convert from parameters
    var file_path = arg0_file_path;

    //Return statement
    try {
      return JSON.parse(fs.readFileSync(file_path, "utf8"));
    } catch (e) {
      //Try JSON5/JSOL import
      try {
        return eval(`(` + fs.readFileSync(file_path, "utf8") + `)`);
      } catch (e) {}
    }
  },

  save: function (arg0_file_path) {
    //Convert from parameters
    var file_path = (arg0_file_path) ? arg0_file_path : "./database.json";

    fs.writeFileSync("./database.json", JSON.stringify(main, null, 2));
    console.log(`Saved main DB to ${file_path}`);
  }
};
