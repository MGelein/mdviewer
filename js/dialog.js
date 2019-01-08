/**Require access to the file dialogs from the system*/
const { dialog } = require('electron').remote;

/**Holds all the possible names of the link stuff */
var linkNames;

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
    if (!mostRecent) mostRecent = ".";
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
function handleMostRecent() {
    loadFile(ini.get('mostRecent'));
}

/**
 * Returns the working directory
 */
function pwd() {
    //Get the most recently opened file from memory
    let mostRecent = ini.get("mostRecent");
    //Replace weird slashes
    mostRecent = mostRecent.replace(/\\/g, '/');
    //Now remove the file from there
    return mostRecent.substring(0, mostRecent.lastIndexOf("/") + 1);
}

/**
 * Loads the provided .md file
 * @param {String} url 
 */
function loadFile(url) {
    //If there is a double markdown extension, ignore it
    url = url.replace(/\.md\.md/g, '.md')
    console.log("LOAD::" + url);
    //Start loading the root.json
    let folderJSON = JSON.parse(fs.readFileSync(pwd() + "root.json", "utf-8"));
    linkNames = JSON.parse(fs.readFileSync(pwd() + folderJSON[1], "utf-8"));
    //Now actually load the main file
    let contents = fs.readFileSync(url, "utf-8");
    //Then convert it to html using the marked plugin
    let html = marked(contents);
    //Finally set the content of the contents div to the marked markdown
    $('#content').html(html);
    //Do some more parsing of the page contents
    parseFinal();
    //Get rid of the search thingy
    $('#searchBlackout').hide();
    $('#toolDiv').show();
    //Set the most recent file correctly
    ini.set("mostRecent", url);
}