import { createContext } from "react";
import { EditMode } from "./types";

type AppContextType = {
    workdir: string | null,
    setWorkdir: React.Dispatch<React.SetStateAction<string | null>>

    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>

    openFiles: string[],
    setOpenFiles: React.Dispatch<React.SetStateAction<string[]>>

    focusFile: string | null,
    setFocusFile: React.Dispatch<React.SetStateAction<string | null>>,

    files: string[],

    fileData: string,
    setFileData: React.Dispatch<React.SetStateAction<string>>,

    editModes: Record<string, EditMode>,
    setEditModes: React.Dispatch<React.SetStateAction<Record<string, EditMode>>>,
}

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;