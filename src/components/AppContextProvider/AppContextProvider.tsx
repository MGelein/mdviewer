import React, { useEffect, useState } from "react";
import AppContext from "../../util/appcontext";
import { loadFile } from "../../util/file";
import { useDirectory, useStorage } from "../../util/hooks";
import { EditMode, Theme } from "../../util/types";

function uniqueFilter<T>(value: T, index: number, arr: T[]) {
    return arr.indexOf(value) === index;
}


function updateTheme(theme: Theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
}

const AppContextProvider: React.FC = ({ children }) => {
    const [workdir, setWorkdir] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<string[]>([]);
    const [openFiles, setOpenFiles] = useState<string[]>([]);
    const [focusFile, setFocusFile] = useState<string | null>(null);
    const [fileData, setFileData] = useState<string>('');
    const [editModes, setEditModes] = useState<Record<string, EditMode>>({});
    const [theme, setTheme] = useStorage<Theme>('theme', 'light');

    useDirectory(workdir, setFiles);

    useEffect(() => updateTheme(theme), [theme]);

    useEffect(() => {
        if (focusFile) {
            setOpenFiles((alreadyOpen) => {
                const nowOpen = [...alreadyOpen, focusFile];
                return nowOpen.filter(uniqueFilter);
            });
        }
    }, [focusFile, setOpenFiles]);

    useEffect(() => {
        if (!workdir) return;
        const loadFileData = async () => {
            if (!focusFile) return setFileData('');
            const data = await loadFile(focusFile, workdir);
            if (!(focusFile in editModes)) editModes[focusFile] = 'preview';
            setFileData(data);
        }
        loadFileData();
    }, [focusFile, workdir, setFileData, editModes]);

    return (<AppContext.Provider value={{
        workdir, setWorkdir,
        error, setError,
        openFiles, setOpenFiles,
        focusFile, setFocusFile,
        fileData, setFileData,
        editModes, setEditModes,
        theme, setTheme,
        files,
    }}>{children}</AppContext.Provider>);
}

export default AppContextProvider;