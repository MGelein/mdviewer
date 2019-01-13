/**Require access to the file dialogs from the system*/
const { dialog } = require('electron').remote;

/**Holds all the possible names of the link stuff */
var linkNames;
/**By default we're not in EDITMODE */
var EDITMODE = false;

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
 * Starts editing the currently opened file
 */
function edit(){
    //Retrieve what file is loaded
    let url = ini.get('mostRecent');
    //Now go and load the markdown code for that file
    if(!EDITMODE){
        //First set that we're editing
        EDITMODE = true;
        //Next load the mdCode from disk
        let markdown = fs.readFileSync(url, 'utf-8');
        //And set that markdown as the content of content div
        $('#content').hide();
        $('#editButton').hide();
        $('#saveButton').show();
        $('#cancelButton').show();
        $('#editContents').val(markdown);
        $('#editor').show();
        $('#searchButton').hide();
    }else{//Else we're saving the edited code
        let mdCode = $('#editContents').val();
        console.log(mdCode);
        fs.writeFileSync(url, mdCode, 'utf-8');
        //Now after saving, load that file for showing
        loadFile(url);
    }
}

/**
 * Starts new file creation
 */
function newFile(){
    //Empty the input field
    $('#newInput').val("");
    //Then fade in the blackout
    $('#newBlackout').fadeIn(400, function () {
        $('#newInput').focus().unbind('keyup').keyup(function (event) {
            if(event.keyCode == 27){//ESC
                $('#newBlackout').fadeOut();
                $('#newInput').val("");
            }else if(event.keyCode == 13){//Enter
                //Check if this was a valid name
                let value = $('#newInput').val().trim();
                if(value.length < 1){
                    giveFeedback("Filename must be at least one character!");
                    return;
                }
                //Add the markdown extension
                value = value + ".md";
                let filename = value.replace(/ /g, '-');
                let url = pwd() + filename;
                if(fs.existsSync(url)){
                    giveFeedback('File <em>(' + url + ")</em> already exists");
                    return;
                }
                //If we made it this far, the filename is unique, and we can save it
                fs.writeFileSync(url, '# ' + value.replace('.md', '') + '\n', 'utf-8');
                //Now we need to rerun indexFiles
                indexFiles();
                //Hide the inputs
                $('#newBlackout').fadeOut();
                $('#newInput').val("");
                //And load the file after a bit
                $('#content').html('Loading...')
                setTimeout(()=>{
                    loadFile(url);
                }, 500)
            }
        });
    });
}

/**
 * Provides the given feedback for 2 seconds, before fading away
 * @param {String} s 
 */
function giveFeedback(s){
    //Set the message
    $('#newFeedback').html(s);
    //And set a timer
    setTimeout(function(){
        //If this is the same message as we're trying to get rid of
        if($('#newFeedback').html() == s){
            $('#newFeedback').html('');
        }
    }, 2000);
}

/**
 * Loads the provided .md file
 * @param {String} url 
 */
function loadFile(url) {
    //If no file was specified, load the most recent one
    if(!url) url = ini.get('mostRecent');
    //Set edit mode to false
    EDITMODE = false;
    $('#editor').hide();
    $('#content').show();
    $('#editButton').show();
    $('#saveButton').hide();
    $('#searchButton').show();
    $('#cancelButton').hide();
    //Show the editButton
    $('#editDiv').fadeIn();
    //If there is a double markdown extension, ignore it
    url = url.replace(/\.md\.md/g, '.md')
    console.log("LOAD::" + url);
    //Set the most recent file correctly
    ini.set("mostRecent", url);
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
}