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
    $('a').each(function (i, link) {
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
}