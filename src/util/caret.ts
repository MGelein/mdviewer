export default function getCaretRect() {
    const range = getActiveRange()?.cloneRange();
    if (!range) return;
    range.collapse(true);
    const rect = range.getClientRects()[0];
    if (rect) return rect;
}

export function replaceAutoComplete(value: string, query: string, endString: string) {
    const range = getActiveRange();
    if (!range) return;
    range.setStart(range.startContainer, range.startOffset - query.length);
    range.deleteContents();
    range.insertNode(document.createTextNode(value + endString));
    range.collapse(false);
}

function getActiveRange() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount !== 0) {
        return selection.getRangeAt(0);
    }
}