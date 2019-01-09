/**
 * Entry point of the code
 */
$(document).ready(function () {
    //Start loading the config.ini
    ini.init();
});

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
}