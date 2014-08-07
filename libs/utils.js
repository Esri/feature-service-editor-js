/**
 * Create our internal namespace
 * @type {{utils: {dataGrid: {}}}}
 */
this.F = {
    utils:{
        dataGrid:{}
    }
}

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
 */
addRemoveColumns = function(/* number */ id){

    var column = F.utils.dataGrid.columns[id];

    if(column.hidden == false){
        F.utils.dataGrid.styleColumn(id,"display:none;");
        F.utils.dataGrid.columns[id].hidden = true;
    }
    else{
        F.utils.dataGrid.styleColumn(id,"display:table-cell;");
        F.utils.dataGrid.columns[id].hidden = false;
    }
}

getFieldNamesArr = function(fields,xfield,yfield,callback){

    var editableDetails = [];

    //Create a simple array of field names that are editable
    for(var item in fields){
        try{
            var editable = fields[parseFloat(item)].editable;
            var name = fields[parseFloat(item)].name;

            var lcName = name.toLowerCase();
            //Get the names of the fields corresponding to x and y.
            //This could be problematic if someone uses x or y in the first part of the field name
            if(lcName.indexOf("x") != -1 && lcName.substring(0,1) == "x") xField = name;
            if(lcName.indexOf("y") != -1 && lcName.substring(0,1) == "y") yField = name;

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