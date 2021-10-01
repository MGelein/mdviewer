export function capitalizeWords(input: string) {
    const words = input.split(/[\s]/);
    const capitalized = words.map(word => capitalizeWord(word));
    return capitalized.join(' ');
}

export function capitalizeWord(word: string) {
    return word.substr(0, 1).toUpperCase() + word.substr(1).toLocaleLowerCase();
}

export function removeExtension(filename: string) {
    const extensionStart = filename.lastIndexOf('.');
    if (extensionStart === -1) return filename;
    return filename.substring(0, extensionStart);
}

export function hyphenToSpace(fileName: string) {
    return fileName.replace(/-/g, ' ');
}

export function filenameToDisplay(filename: string) {
    return capitalizeWords(removeExtension(hyphenToSpace(filename)))
}