import { useContext, useEffect, useState } from "react";
import AppContext from "./appcontext";
import { getLocalStorage, setLocalStorage } from "./storage";
import { AnimState } from "./types";
import { watch } from "fs";
import { listFiles } from "./file";
import { findHotkey, registerHotkey, unregisterHotkey } from "./hotkey";

export function useActiveHotkeys() {
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            const hotkey = findHotkey(e);
            if (hotkey) hotkey.callback();
        }
        document.addEventListener('keydown', listener);
        return () => document.removeEventListener('keydown', listener);
    }, []);
}

export function useHotkey(hotkeyDescription: string, callback: () => void) {
    useEffect(() => {
        const hotkey = registerHotkey(hotkeyDescription, callback);
        return () => {
            console.log("destructor5");
            if (hotkey) unregisterHotkey(hotkey);
        }
    }, [callback, hotkeyDescription]);
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) throw new Error('You have no context at the app root!');
    return context;
}

export function useStorage<T>(name: string, defaultValue: T) {
    const [value, setValue] = useState(() => getLocalStorage(name, defaultValue));

    useEffect(() => {
        setLocalStorage(name, value);
    }, [value, name]);

    return [value, setValue] as [T, React.Dispatch<React.SetStateAction<T>>];
}

export function useAnimState(startingState: AnimState = "opening", onClose?: () => void) {
    const [animState, setAnimState] = useState(startingState);

    useEffect(() => {
        const id = setTimeout(() => {
            if (animState === 'opening') setAnimState('open');
            if (animState === 'closing') onClose?.();
        }, 500);
        return () => clearTimeout(id);
    }, [animState, setAnimState, onClose]);

    return [animState, setAnimState] as [AnimState, React.Dispatch<React.SetStateAction<AnimState>>]
}

export function useDirectory(url: string | null, onChange: (filelist: string[]) => void) {
    const [eventDescription, setEventDescription] = useState<string>();

    if (url) {
        watch(url, (event, filename) => {
            setEventDescription(`${event} - ${filename}`);
        });
    }

    useEffect(() => {
        if (!url) return;
        listFiles(url).then((files) => onChange(files));
    }, [url, eventDescription, onChange]);
}

export function useKeyDown(key: string, onKeyDown: () => void) {
    useEffect(() => {
        const keydown = (e: KeyboardEvent) => e.key === key && onKeyDown();
        document.addEventListener('keydown', keydown);
        return () => document.removeEventListener('keydown', keydown);
    }, [key, onKeyDown]);
}