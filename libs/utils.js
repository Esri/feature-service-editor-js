/**
 * Validates a url
 * @param url
 * @returns boolean
 */
validateURL = function(/* String */ url){
    return  /^(ftp|http|https):\/\/[^ "]+$/.test(url);
}

/**
 * Returns the object containing any editing changes to grid data.
 * @param dataGrid
 * @returns {*}
 */
deleteDirtyBits = function(dataGrid){
    var dirty = dataGrid.dirty;
    var id = Object.keys(dirty)[0];
    delete dirty[id];
}

/**
 * Helper function for adding and removing columns for better visibility
 * in FeatureServices that have many fields.
 * @param id
 * @param grid
 */
addRemoveColumns = function(/* number */ id,grid){

    var column = grid.columns[id];

    if(column.hidden == false){
        grid.styleColumn(id,"display:none;");
        grid.columns[id].hidden = true;
    }
    else{
        grid.styleColumn(id,"display:table-cell;");
        grid.columns[id].hidden = false;
    }
}

getFieldNamesArr = function(featureEditor,callback){

    var editableDetails = [];

    var fields = featureEditor.featureLayer.fields;

    //Create a simple array of field names that are editable
    for(var item in fields){
        try{
            var editable = fields[parseFloat(item)].editable;
            var name = fields[parseFloat(item)].name;

            var lcName = name.toLowerCase();
            //Get the names of the fields corresponding to x and y.
            //This could be problematic if someone uses x or y in the first part of the field name
            if(lcName.indexOf("x") != -1 && lcName.substring(0,1) == "x") featureEditor.xField = name;
            if(lcName.indexOf("y") != -1 && lcName.substring(0,1) == "y") featureEditor.yField = name;

            // If there is no x or y field then look for lat lon
            if(featureEditor.xfield == null || featureEditor.yfield == null){
                if(lcName.indexOf("lat") != -1) featureEditor.xField = name;
                if(lcName.indexOf("lon") != -1){
                    featureEditor.yField = name;
                }
                else if(lcName.indexOf("lng") != -1){
                    featureEditor.yField = name;
                }
            }

            if(editable == true){
                editableDetails.push(name);
            }
        }
        catch(err){
            console.log("init: " + err.message);
        }
    }

    callback(editableDetails);
}