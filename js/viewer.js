/**
 * Entry point of the code
 */
$(document).ready(function(){
    //Start loading the config.ini
    ini.init();
});

/**
 * Does multiple final checks before we're done with processing,
 * amongst other things cleans up links, and adds .md extensions 
 * if no extension was found
 */
function parseFinal() {
    //Check all links for an extension, if none is present, add .md
    $('a').each(function (index, link) {
        //Get the href attribute of this link
        let href = $(link).attr('href');
        //Don't do anything if this is a folder ref
        if(href.charAt(href.length - 1) == '/') return;
        //See if it contains an extension (<10 letters long)
        if (href.indexOf('.') > -1 && href.indexOf('.') > 1) {
            if (href.substring(href.indexOf('.').length < 10)){//If the ext is shorter than 10 chars
                console.log("skip: " + href);
                return;//Ignore this link, it's probably fine
            }
        }else if(href == undefined || href.length == 0){//If no link is made explicitly, link to name
            href = $(link).text().trim().toLowerCase();
        }
        //If we reach here, we modify the link
        href += ".md";
        //Update the link with the new href property
        $(link).attr('href', href);
    });

    //For all links, add a custom click handler
    $('a').unbind('click').click(function(event){
        //Prevent the standard event from firing
        event.preventDefault();
        //Start loading that file using our own channel, add the current working directory
        loadFile(pwd() + $(this).attr('href'));
    });

    //Set image width in percent to the alt-text of the image
    $('img').each(function(index, image){
        //Retrieve ATL attribute, if set, else ignore, just use default settings
        let alt = $(this).attr('alt');
        if(!alt) return;
        //Now check if there is a letter in there, afterwards, remove the letters
        alt = alt.toLowerCase();
        let float = "left";
        //Set float according to letter found
        if(alt.indexOf("l") != -1) float = "left";
        else if(alt.indexOf("r") != -1) float = "right";
        else if(alt.indexOf("c") != -1) float = "center";
        float = "float:" + float + ";";
        //Now remove that letter
        let width = "50";
        alt = alt.replace(/[c,l,r]/g, '');
        //Check if the part is actually a number
        if(!isNaN(alt)) width = alt;
        width = "width:" + width + "%;";
        //Now set this as the style of the img
        $(this).attr("style", width + float);
    });
}