/**
 * This file will generate an index of all the files in this folder
 */
//We need file system access
const fs = require('fs');
const path = require('path');

//Get the console args
let args = process.argv.splice(1);
let workingDir = ".";
if(args.length > 1){
    workingDir = args.splice(1).join(" ");
}

//List of possible link names
var linkNames = [];
//Holds the index of the files
var fileIndex = parseDir(workingDir);
//Now save that to the disk
fs.writeFileSync(workingDir + "/fileIndex.json", JSON.stringify(fileIndex), "utf-8");
//Next generate the link autocomplete list
fs.writeFileSync(workingDir + "/linkNames.json", JSON.stringify(linkNames), "utf-8");

/**
 * Parses the directory that is given, recursively also parses
 * all contained directories and then returns this object
 * @param {String} url 
 */
function parseDir(url, fileName) {
    //If no fileName was specified, assume it was just the url
    if (!fileName) fileName = url;
    //The index of this folder
    let folderIndex = { name: url, location: fileName, type: "folder", entries: [] };
    //Read the files in this folder
    let files = fs.readdirSync(fileName);
    //Parse each file
    files.forEach(file => {
        //If something is a directory, recursively scan it
        if (fs.statSync(fileName + "/" + file).isDirectory()) {
            if (file != "templates") {
                folderIndex.entries.push(parseDir(file, fileName + "/" + file));
            }
        } else {
            //Add the file entry if it's a file
            let fileObj = { name: file, type: "file", ext: getExt(file) };
            //Add the file to the link list, but replace extension, if this is a markdown file
            if (fileObj.ext === '.md') addFile(fileObj, fileName);
            //Finally add the fileObject to the list of files
            folderIndex.entries.push(fileObj);
        }
    });
    //Return the finished folderIndex
    return folderIndex;
}

/**
 * Adds the provided fileObject to the list of linnknames
 */
function addFile(file, location) {
    location += "/";
    location = path.resolve(location);
    //Get the name of the file without extension
    let name = file.name.replace(file.ext, "");
    //Make it lowercase, and trim it
    name = name.toLowerCase().trim();
    name = name.replace(/ /g, '-');
    //Addonly hyphenated version to the list
    linkNames.push({ "name": name, "location": location });
    //Now check what it links to
    let contents = fs.readFileSync(location + "/" + name + ".md", 'utf-8');

    //Find all the matches in this file
    let matches = contents.match(/\[.+?\]\(.*?\)/g);//Question mark makes the + ungreedy
    file.links = [];
    if (matches) {
        matches.forEach(match => {
            //See if the match has an empty pointer
            let name;
            if (match.indexOf("()") != -1) {
                //Remove the non-name characters from the link
                name = match.replace(/[\[\]\(\)]/g, '');
                //Only add it if it is a unique link
                if (file.links.indexOf(name) == -1) file.links.push(name);
            } else {
                //Find the href component of this link
                name = match.substring(match.lastIndexOf("(") + 1, match.lastIndexOf(")"));
            }
            //Only add it if it is a unique link
            if (file.links.indexOf(name) == -1) file.links.push(name);
        });
    }
}

/**
 * Returns the extension for a fileName
 */
function getExt(s) {
    //Test if this file has an extension
    if (s.lastIndexOf(".") > -1) {
        return s.substring(s.lastIndexOf("."));
    } else {
        //No extension was found
        return "None";
    }
}