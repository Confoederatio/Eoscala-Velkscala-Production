//Initialise functions
{
  /*
    cleanObject() - Removes both zero values and undefined/null values from an object by default.
    arg0_object: (Object) - The object to pass.
    arg1_options: (Object)
      remove_falsey: (Boolean) - Optional. Whether to remove falsey values. False by default.
      remove_zeroes: (Boolean) - Optional. Whether to remove zero values from the cleaned object. False by default.

    Returns: (Object)
  */
  global.cleanObject = function (arg0_object, arg1_options) {
    //Convert from parameters
    var object = arg0_object;
    var options = (arg1_options) ? arg1_options : {};

    //Clean stringify object first before parsing remove_zeroes
    var cleaned_object = cleanStringify(object);

    var all_cleaned_keys = Object.keys(cleaned_object);

    //Iterate over all_cleaned_keys
    for (var i = 0; i < all_cleaned_keys.length; i++) {
      var local_value = cleaned_object[all_cleaned_keys[i]];

      if (local_value == undefined || local_value == null)
        delete cleaned_object[all_cleaned_keys[i]];
      if (options.remove_falsey) {
        if (!local_value)
          delete cleaned_object[all_cleaned_keys[i]];
      } else if (options.remove_zeroes) {
        if (local_value == 0)
          delete cleaned_object[all_cleaned_keys[i]];
      }

      //Recursively call function
      if (typeof local_value == "object")
        cleaned_object[all_cleaned_keys[i]] = cleanObject(local_value, options);
    }

    //Return statement
    return cleaned_object;
  };

  /**
   * cubicSplineInterpolationObject() - Performs a cubic spline interpolation operation on an object.
   * @param {Object} arg0_object - The object to perform the cubic spline interpolation on.
   * @param {Object} [arg1_options]
   *  @param {Array<number>} [arg1_options.years] - Optional. The years to interpolate over if possible.
   * 
   * @return {Object}
   */
  global.cubicSplineInterpolationObject = function (arg0_object, arg1_options) {
    //Convert from parameters
    var object = arg0_object;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var sorted_indices = sortYearValues(object);
    var values = sorted_indices.values;
    var years = sorted_indices.years;

    //Initialise options post-local instance variables
    options.years = (options.years) ? 
      getList(options.years) : years;

    //Iterate over all years in domain
    for (var i = 0; i < options.years.length; i++)
      if (options.years >= years[0] && options.years[i] <= returnSafeNumber(years[years.length - 1])) {
        let current_year = options.years[i];

        object[current_year] = cubicSplineInterpolation(years, values, current_year);
      }

    //Return statement
    return object;
  };

  /*
    flattenObject() - Moves all keys into the 1st nesting.
    arg0_object: (Object) - The object to pass.

    Returns: (Object)
  */
  global.flattenObject = function (arg0_object) {
    //Convert from parameters
    var object = arg0_object;

    //Declare local instance variables
    var all_object_keys = Object.keys(object);

    //Iterate over all_object_keys to move keys into current object
    for (var i = 0; i < all_object_keys.length; i++) {
      var flattened_subobj = {};
      var local_subobj = object[all_object_keys[i]];

      if (typeof local_subobj == "object") {
        flattened_subobj = flattenObject(local_subobj);

        var all_flattened_keys = Object.keys(flattened_subobj);

        for (var x = 0; x < all_flattened_keys.length; x++)
          if (!object[all_flattened_keys[x]]) {
            object[all_flattened_keys[x]] = flattened_subobj[all_flattened_keys[x]];
          } else {
            object[all_flattened_keys[x]] += flattened_subobj[all_flattened_keys[x]];
          }
      } else if (typeof local_subobj == "number") {
        if (!object[all_object_keys[i]])
          object[all_object_keys[i]] = local_subobj;
        //Do not implement an else object here because that would add 1n per depth
      } else {
        object[all_object_keys[i]] = local_subobj;
      }
    }

    //Delete any remanent typeof object in the current object
    all_object_keys = Object.keys(object);

    for (var i = 0; i < all_object_keys.length; i++)
      if (typeof object[all_object_keys[i]] == "object")
        delete object[all_object_keys[i]];

    //Return statement
    return object;
  };

  /*
    getDepth() - Returns object depth as a number.
    arg0_object: (Object) - The object to fetch depth for.
    arg1_depth: (Number) - Optimisation parameter used as an internal helper.

    Returns: (Number)
  */
  global.getDepth = function (arg0_object, arg1_depth) {
    //Convert from parameters
    var object = arg0_object;
    var depth = (arg1_depth) ? arg1_depth : 1;

    //Iterate over object
    for (var key in object) {
      if (!object.hasOwnProperty(key)) continue;

      if (typeof object[key] == "object") {
        var level = getDepth(object[key]) + 1;
        depth = Math.max(depth, level);
      }
    }

    //Return statement
    return depth;
  };

  /*
    getObjectKey() - Fetches object value from a string (e.g. 'test.one.two')
    arg0_object: (Object) - The object to fetch the key from.
    arg1_key: (String) - The string of the key to fetch from the object.

    Returns: (Variable)
  */
  global.getObjectKey = function (arg0_object, arg1_key) {
    //Convert from parameters
    var object = arg0_object;
    var key = arg1_key;

    //Declare local instance variables
    var split_key = (Array.isArray(key)) ? key : key.split(".");
    var return_value;

    if (split_key.length <= 1 && object[split_key[0]]) {
      return_value = object[split_key[0]];
    } else {
      if (object[split_key[0]]) {
        //Preserve old index; pop from front before calling recursion
        var old_index = JSON.parse(JSON.stringify(split_key[0]));
        split_key.shift();
        var found_return_value = getObjectKey(object[old_index], split_key);

        //If value was found, return that
        if (found_return_value)
          return_value = found_return_value;
      }
    }

    //Return statement
    return return_value;
  };

  /*
    getObjectList() - Returns object as an array list.
    arg0_object_list: (Object) - The objectified list to pass.

    Returns: (Array)
  */
  global.getObjectList = function (arg0_object_list) {
    //Convert from parameters
    var list_obj = arg0_object_list;

    //Declare local instance variables
    if (list_obj) {
      var all_list_keys = Object.keys(list_obj);
      var object_array = [];

      //Append everything in object as object_array
      for (var i = 0; i < all_list_keys.length; i++)
        object_array.push(list_obj[all_list_keys[i]]);

      //Return statement
      return object_array;
    } else {
      return [];
    }
  };

  /*
    getSubobject() - Fetches a subobject.
    arg0_object: (Object) - The object to pass.
    arg1_key: (String) - The key to recursively look for to fetch the local subobject.
    arg2_restrict_search: (Boolean) - Whether to restrict the search to the 1st layer.

    Returns: (Object)
  */
  global.getSubobject = function (arg0_object, arg1_key, arg2_restrict_search) {
    //Convert from parameters
    var object = arg0_object;
    var key = arg1_key;
    var restrict_search = arg2_restrict_search;

    //Declare local instance variables
    var all_object_keys = Object.keys(object);

    //Process key
    if (!Array.isArray(key))
      key = getList(key.split("."));

    //Iterate over all_object_keys
    for (var i = 0; i < all_object_keys.length; i++) {
      var local_subobj = object[all_object_keys[i]];

      if (all_object_keys[i] == key[key.length - 1]) {
        //Guard clause
        return local_subobj;
        break;
      } else if (typeof local_subobj == "object") {
        var explore_object = false;
        var new_key = JSON.parse(JSON.stringify(key));
        if (key.length > 1)
          restrict_search = true;

        if (restrict_search && all_object_keys[i] == key[0]) {
          new_key.splice(0, 1);
          explore_object = true;
        }
        if (!restrict_search) explore_object = true;

        //Restrict search for certain arguments
        if (explore_object) {
          var has_subobj = getSubobject(local_subobj, new_key, restrict_search);

          if (has_subobj) {
            //Return statement
            return has_subobj;
            break;
          }
        }
      }
    }
  };

  /*
    getSubobjectKeys() - Fetches the keys in a subobject that match the given criteria.
    arg0_object: (Object) - The object to pass to the function.
    arg1_options: (Object)
      exclude_keys: (Array<String, ...>), - A list of keys to exclude
      include_objects: (Boolean), - Optional. Whether or not to include object keys. False by default.
      only_objects: (Boolean) - Optional. Whether to only include objects. False by default.

    Returns: (Array<String, ...>)
  */
  global.getSubobjectKeys = function (arg0_object, arg1_options) {
    //Convert from parameters
    var object = arg0_object;
    var options = (arg1_options) ? arg1_options : {};

    //Initialise options
    if (!options.exclude_keys) options.exclude_keys = [];

    //Declare local instance variables
    var all_keys = [];
    var all_object_keys = Object.keys(object);

    //Iterate over all_object_keys
    for (var i = 0; i < all_object_keys.length; i++) {
      var local_subobj = object[all_object_keys[i]];

      if (typeof local_subobj == "object") {
        //Push key itself first
        if (!options.exclude_keys.includes(all_object_keys[i]))
          all_keys.push(all_object_keys[i]);

        var all_subkeys = getSubobjectKeys(local_subobj, options);

        if (options.include_objects || options.only_objects)
          if (!options.exclude_keys.includes(all_object_keys[i]))
            all_keys.push(all_object_keys[i]);

        for (var x = 0; x < all_subkeys.length; x++)
          if (!options.exclude_keys.includes(all_subkeys[x]))
            all_keys.push(all_subkeys[x]);
      } else {
        if (!options.only_objects)
          if (!options.exclude_keys.includes(all_object_keys[i]))
            all_keys.push(all_object_keys[i]);
      }
    }

    //Return statement
    return all_keys;
  };

  /*
    mergeObjects() - Merges two objects together.
    arg0_object: (Object) - The 1st object to merge into.
    arg1_object: (Object) - The 2nd object to concatenate/add.
    arg2_options: (Object)
      must_have_difference: (Boolean) - Optional. Whether values must be different before they can be added/subtracted from one another. False by default
      overwrite: (Boolean) - Optional. Whether to overwrite objects when merging. False by default
      recursive: (Boolean) - Optional. Whether merging is recursive. True by default

    Returns: (Object)
  */
  global.mergeObjects = function (arg0_object, arg1_object, arg2_options) {
    //Convert from parameters - merge_obj overwrites onto merged_obj
    var merged_obj = JSON.parse(JSON.stringify(arg0_object));
    var merge_obj = JSON.parse(JSON.stringify(arg1_object));
    var options = (arg2_options) ? arg2_options : {};

    //Initialise options
    if (options.recursive == undefined) options.recursive = true;

    //Declare local instance variables
    var all_merge_keys = Object.keys(merge_obj);

    //Iterate over all_merge_keys
    for (var i = 0; i < all_merge_keys.length; i++) {
      var current_value = merged_obj[all_merge_keys[i]];
      var local_value = merge_obj[all_merge_keys[i]];

      if (typeof local_value == "number") {
        if (merged_obj[all_merge_keys[i]]) {
          //Check if variable should be overwritten
          var to_overwrite = (options.overwrite || (options.must_have_difference && current_value == local_value));

          merged_obj[all_merge_keys[i]] = (!to_overwrite) ?
            merged_obj[all_merge_keys[i]] + local_value :
            local_value; //Add numbers together
        } else {
          merged_obj[all_merge_keys[i]] = local_value;
        }
      } else if (typeof local_value == "object" && current_value && local_value) {
        if (options.recursive)
          merged_obj[all_merge_keys[i]] = mergeObjects(current_value, local_value, options); //Recursively merge objects if possible
      } else {
        merged_obj[all_merge_keys[i]] = local_value;
      }
    }

    //Return statement
    return merged_obj;
  }

  global.modifyValue = function (arg0_object, arg1_key, arg2_number, arg3_delete_negative) {
    //Convert from parameters
    var object = arg0_object;
    var key = arg1_key;
    var number = parseFloat(arg2_number);
    var delete_negative = arg3_delete_negative;

    //Set value
    object[key] = (object[key]) ? object[key] + number : number;

    if (delete_negative)
      if (object[key] <= 0)
        delete object[key];

    //Return statement
    return object[key];
  };

  /*
    removeZeroes() - Removes zero values from an object.
    arg0_object: (Object) - The object to pass to the function.

    Returns: (Object)
  */
  global.removeZeroes = function (arg0_object) {
    //Convert from parameters
    var object = JSON.parse(JSON.stringify(arg0_object));

    //Declare local instance variables
    var all_object_keys = Object.keys(object);

    //Iterate over all_object_keys
    for (var i = 0; i < all_object_keys.length; i++) {
      var local_subobj = object[all_object_keys[i]];

      if (typeof local_subobj == "number")
        if (local_subobj == 0)
          delete object[all_object_keys[i]];
      if (typeof local_subobj == "object")
        object[all_object_keys[i]] = removeZeroes(local_subobj);
    }

    //Return statement
    return object;
  };

  /*
    sortObject() - Sorts an object.
    arg0_object: (Object) - The object to sort.
    arg1_options: (Object)
      type: (String) - Optional. The order to sort the object in. 'ascending'/'descending'. 'descending' by default.
  */
  global.sortObject = function (arg0_object, arg1_options) {
    //Convert from parameters
    var object = arg0_object;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var mode = (options.type) ? options.type : "descending";

    //Return statement
    return Object.fromEntries(
      Object.entries(object).sort(([, a], [, b]) => {
        //Standardise array values
        if (Array.isArray(a))
          a = getSum(a);
        if (Array.isArray(b))
          b = getSum(b);

        return (mode == "descending") ? b - a : a - b;
      })
    );
  };

  /**
   * sortObjectByKey() - Sorts an object by key.
   * @param {Object} arg0_object
   * @param {Object} [arg1_options]
   *  @param {String} [arg1_options.type="descending"] - The order to sort the object in. 'ascending'/'descending'. 'descending by default.
   */
  global.sortObjectByKey = function (arg0_object, arg1_options) {
    //Convert from parameters
    var object = arg0_object;
    var options = (arg1_options) ? arg1_options : {};

    //Declare local instance variables
    var mode = (options.type) ? options.type : "descending";
    var sorted_keys = Object.keys(object)
      .map((key) => key)
    .sort((a, b) => (type == "ascending") ?
      a.localeCompare(b) : b.localeCompare(a));
    var sorted_obj = {};

    for (let key of sorted_keys)
      sorted_obj[key] = object[key];

    //Return statement
    return sorted_obj;
  };

  global.sortYearValues = function (arg0_object) {
    //Convert from parameters
    var object = arg0_object;

    //Declare local instance variables
    var values = Object.values(object).map((value) => value);
    var years = Object.keys(object).map((year) => parseInt(year));

    //Ensure values; years are sorted properly
    var sorted_indices = years.map((_, i) => i).sort((a, b) => years[a] - years[b]);
      values = sorted_indices.map(i => values[i]);
      years = sorted_indices.map(i => years[i]);

    //Return statement
    return { values: values, years: years };
  };
}
