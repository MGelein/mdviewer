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
    dialog.showOpenDialog({
        title: "Load a Markdown File",
        "filters": filters,
        properties: ["openFile"]
    }, callback);
}

/**
 * Called when the load button is clicked
 */
function handleLoadButton() {
    showOpenDialog(function (filepaths) {
        //Start loading the first file
        if (filepaths && filepaths.length > 0) loadTrackdata(filepaths[0]);
    });
}