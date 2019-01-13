/**Import command execution */
const { exec } = require('child_process');

/**
 * Entry point of the code
 */
$(document).ready(function () {
    //Start loading the config.ini
    ini.init();
});

/**
 * Re-indexes the files if we have added new ones
 */
function indexFiles(){
    exec("cd " + pwd() + " & node indexFiles");
}

/**
 * Shows the search window
 */
function search() {
    //Empty the search field
    $('#searchInput').val("");
    //Then fade in the blackout
    $('#searchBlackout').fadeIn(400, function () {
        $('#searchInput').focus().unbind('keyup').keyup(function (event) {
            let matches = doSearch();
            if(matches.length == 1 && event.keyCode == 13){//If we pressed enter while the last one was there
                let match = matches[0];
                let fullPath = match.location.replace(/\\/g, '/') + "/" + match.name + ".md";
                loadFile(fullPath);
            }
            if(event.keyCode == 27){//ESC
                $('#searchBlackout').fadeOut();
                $('#searchInput').val("");
            }
        });
        doSearch();
    });
}

/**
 * Do a search in the linkNames array
 */
function doSearch() {
    //Get the value from the input search
    let val = $('#searchInput').val();
    let matches = [];
    linkNames.forEach(linkName => {
        if (val.trim().length == 0) {
            matches.push(linkName);
        }else if (linkName.name.indexOf(val) > -1) {
            matches.push(linkName);
        }
    });
    //Now we have a list of linkName items, let's make a list of clickable links
    let html = "<ul>";
    matches.forEach(match => {
        //For each match, generate a link
        let fullPath = match.location.replace(/\\/g, '/') + "/" + match.name + ".md";
        let display = match.name.split(val);
        display = display.join("<b>" + val + "</b>");
        html += "<li class='searchResult' onclick='loadFile(\"" + fullPath + "\")'>" + display
             + "<em>" + shortenLoc(match.location) + "</em></li>";
    });
    html += "</ul>";
    //Set the HTML of the results
    $('#searchResults').html(html);
    return matches;
}

/**
 * Shortens the provided url, by removing the static location (absolute path) of 
 * the solestreia folder itself
 * @param {String} url 
 */
function shortenLoc(url){
    return url.substring(url.indexOf("solestreia") + 10);
}

/**
 * Does multiple final checks before we're done with processing,
 * amongst other things cleans up links, and adds .md extensions 
 * if no extension was found
 */
function parseFinal() {
    //Set image width in percent to the alt-text of the image
    $('img').each(function (index, image) {
        //Retrieve ATL attribute, if set, else ignore, just use default settings
        let alt = $(this).attr('alt');
        if (!alt) return;
        //Now check if there is a letter in there, afterwards, remove the letters
        alt = alt.toLowerCase();
        let float = "left";
        //Set float according to letter found
        if (alt.indexOf("l") != -1) float = "left";
        else if (alt.indexOf("r") != -1) float = "right";
        else if (alt.indexOf("c") != -1) float = "center";
        float = "float:" + float + ";";
        //Now remove that letter
        let width = "50";
        alt = alt.replace(/[c,l,r]/g, '');
        //Check if the part is actually a number
        if (!isNaN(alt)) width = alt;
        width = "width:" + width + "%;";
        //Now set this as the style of the img
        $(this).attr("style", width + float).addClass('img');
        //Finally, normalize all urls to the current pwd
        $(this).attr('src', pwd() + $(this).attr('src'));
    });
    
    //Finally, replace all {} with span badge tags,
    //And find any command tags
    let html = $('#content').html();
    html = html.replace(/\{/g, '<span class="badge">');
    html = html.replace(/\}/g, '</span>');
    html = replaceCMD(html);
    $('#content').html(html);

    //Now go through all badges, and set their color dependent on their text
    $('.badge').each(function(index, badge){
        let text = $(badge).text().trim().toLowerCase();
        switch(text){
            case 'cmbt':
            case 'combat':
            case 'combt':
            case 'cmbat':
                $(badge).addClass('badge-danger');
                break;
            case 'pzl':
            case 'puzzle':
            case 'puzzl':
            case 'puzl':
            case 'pzzle':
                $(badge).addClass('badge-primary');
                break;
            case 'chl':
            case 'challenge':
            case 'chlng':
            case 'challeng':
            case 'chlg':
                $(badge).addClass('badge-warning');
                break;
            case 'rp':
            case 'roleplay':
            case 'rolep':
            case 'rplay':
                $(badge).addClass('badge-success');
                break;
            default:
                $(badge).addClass('badge-info');
        }
    });

    //For all links, add a custom click handler
    $('a').unbind('click').click(function (event) {
        //Prevent the standard event from firing
        event.preventDefault();
        //See if the HREF has been set
        let href = $(this).attr('href').trim().toLowerCase();
        //If left empty, it means the content of the tag is the name of the link
        if (href.length == 0) href = $(this).text().trim().toLowerCase();
        //Now find that entry in the list of entries
        linkNames.forEach(linkName => {
            if (linkName.name === href || linkName.name === href.replace(/ /g, '-')) {
                //Start loading that file using our own channel, add the current working directory
                loadFile(linkName.location + "/" + linkName.name + ".md");
            }
        });
    });

    //Overwrite any click handler for command links
    $('.command').unbind('click').click(function(event){
        //Prevent normal click event from firing
        event.preventDefault();
        //Now execute this command (BE VERY CAREFUL WITH THIS!)
        //First cd to the current working directory, then execute the command
         exec('start cmd.exe /K "cd ' + pwd() + " & " + $(this).text().trim() + '"');
    });
}

/**
 * Replaces all the command tokesn from the provided text
 * @param {String} src 
 */
function replaceCMD(src){
    //Start and end tags to place in the HTML
    let start = "<a href='#' class='badge badge-dark command'>";
    let end = "</a>";
    //Find the first index
    let index = src.indexOf('CMD(');
    //Keep searching untill we have replaced all of them
    while(index > -1){
        //Start searching for the end of this CMD thing
        let psgEnd = src.indexOf(')', index);
        //Replace it with the start and end tags
        src = src.substring(0, index) + start + src.substring(index + 4, psgEnd) + end + src.substring(psgEnd + 1);
        //Find the next occurence
        index = src.indexOf('CMD(');
    }
    //Return the edited text
    return src;
}