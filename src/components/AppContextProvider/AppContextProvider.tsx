import React, { useEffect, useState } from "react";
import AppContext from "../../util/appcontext";
import { loadFile } from "../../util/file";
import { useDirectory } from "../../util/hooks";
import { EditMode } from "../../util/types";

function uniqueFilter<T>(value: T, index: number, arr: T[]) {
    return arr.indexOf(value) === index;
}

const AppContextProvider: React.FC = ({ children }) => {
    const [workdir, setWorkdir] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<string[]>([]);
    const [openFiles, setOpenFiles] = useState<string[]>([]);
    const [focusFile, setFocusFile] = useState<string | null>(null);
    const [fileData, setFileData] = useState<string>('');
    const [editModes, setEditModes] = useState<Record<string, EditMode>>({});

    useDirectory(workdir, setFiles);

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
            setFileData(data);
            if (!(focusFile in editModes)) editModes[focusFile] = 'preview';
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
        files,
    }}>{children}</AppContext.Provider>);
}

export default AppContextProvider;