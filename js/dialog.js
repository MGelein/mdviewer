/**Require access to the file dialogs from the system*/
const { dialog } = require('electron').remote;

/**The file type filter for the loading of files in this application */
const filters = [
    { name: 'Markdown File', extensions: ['md'] }
];

/**
 * Shows the standard load/open dialog, at least, 'standard'
 * for this application.
 * @param {Function} callback the function that is called once files have been seleted. Param is filename array.
 */
function showOpenDialog(callback) {
    let mostRecent = ini.get("mostRecent");
    if(!mostRecent) mostRecent = ".";
    dialog.showOpenDialog({
        title: "Load a Markdown File",
        "filters": filters,
        defaultPath: mostRecent,
        properties: ["openFile"]
    }, callback);
}

/**
 * Called when the load button is clicked
 */
function handleLoadButton() {
    showOpenDialog(function (filepaths) {
        //Start loading the first file
        if (filepaths && filepaths.length > 0) loadFile(filepaths[0]);
    });
}

/**
 * Shortcut to load the most recently opened file
 */
function handleMostRecent(){
    loadFile(ini.get('mostRecent'));
}

/**
 * Loads the provided .md file
 * @param {String} url 
 */
function loadFile(url){
    //Set the most recent file correctly
    ini.set("mostRecent", url);
    //Now actually load it
    let contents = fs.readFileSync(url, "utf-8");
    //Then convert it to html using the marked plugin
    let html = marked(contents);
    //Finally set the content of the contents div to the marked markdown
    $('content').html(html);
    //Do some more parsing of the page contents
    parseFinal();
}