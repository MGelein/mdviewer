export type Hotkey = {
    character: string;
    shift: boolean;
    control: boolean;
    alt: boolean;
    callback: () => void;
}

let activeHotkeys: Hotkey[] = [];

function isModifierKey(key: string) {
    return key === 'shift' || key === 'alt' || key === 'ctrl';
}

function parseHotkeyDescription(description: string, callback: () => void) {
    const keys = description.toLowerCase().split('+');
    const shift = keys.includes('shift');
    const control = keys.includes('ctrl');
    const alt = keys.includes('alt');
    const character = keys.find(key => !isModifierKey(key));
    if (!character) return null;
    return { character, shift, alt, control, callback };
}

export function getHotkeyDescription(hotkeyDescription?: string) {
    if (!hotkeyDescription) return "";
    return ` (${hotkeyDescription.replace(/[+]/g, ' + ').toUpperCase()})`;
}

export function registerHotkey(description: string, callback: () => void) {
    const hotkey = parseHotkeyDescription(description, callback);
    if (hotkey) {
        const hotkeyIndex = activeHotkeys.indexOf(hotkey);
        if (hotkeyIndex === -1) activeHotkeys.push(hotkey);
    }
    return hotkey;
}

export function unregisterHotkey({ character, alt, shift, control, callback }: Hotkey) {
    activeHotkeys = activeHotkeys.filter(h => {
        return h.alt !== alt || h.callback !== callback || h.shift !== shift || h.character !== character || h.control !== control;
    });
}

export function findHotkey({ altKey, key, shiftKey, ctrlKey }: KeyboardEvent) {
    return activeHotkeys.find(({ alt, shift, control, character }) => {
        return alt === altKey && shift === shiftKey && control === ctrlKey && character === key.toLowerCase();
    });
}