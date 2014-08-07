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
