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
    //For all links, add a custom click handler
    $('a').unbind('click').click(function(event){
        //Prevent the standard event from firing
        event.preventDefault();
        //See if the HREF has been set
        let href = $(this).attr('href').trim().toLowerCase();
        //If left empty, it means the content of the tag is the name of the link
        if(href.length == 0) href = $(this).text().trim().toLowerCase();
        //Now find that entry in the list of entries
        linkNames.forEach(linkName =>{
            if(linkName.name === href){
                //Start loading that file using our own channel, add the current working directory
                loadFile(linkName.location + "/" + linkName.name + ".md");
            }
        });
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
        $(this).attr("style", width + float).addClass('img');
        //Finally, normalize all urls to the current pwd
        $(this).attr('src', pwd() + $(this).attr('src'));
    });
}