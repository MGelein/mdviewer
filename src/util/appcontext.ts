import { createContext } from "react";

type AppContextType = {
    workdir: string | null,
    setWorkdir: React.Dispatch<React.SetStateAction<string | null>>

    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>

    openFiles: string[],
    setOpenFiles: React.Dispatch<React.SetStateAction<string[]>>

    focusFile: string | null,
    setFocusFile: React.Dispatch<React.SetStateAction<string | null>>,

    files: string[];

    fileData: string;
    setFileData: React.Dispatch<React.SetStateAction<string>>,
}

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;