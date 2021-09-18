import React, { useEffect, useState } from "react";
import AppContext from "../../util/appcontext";
import { loadFile } from "../../util/file";
import { useDirectory } from "../../util/hooks";

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
        if (!workdir || !focusFile) return;
        const loadFileData = async () => {
            const data = await loadFile(focusFile, workdir);
            setFileData(data);
        }
        loadFileData();
    }, [focusFile, workdir, setFileData]);

    return (<AppContext.Provider value={{
        workdir, setWorkdir,
        error, setError,
        openFiles, setOpenFiles,
        focusFile, setFocusFile,
        fileData, setFileData,
        files,
    }}>{children}</AppContext.Provider>);
}

export default AppContextProvider;