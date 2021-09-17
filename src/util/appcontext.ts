import { createContext } from "react";

type AppContextType = {
    workdir: string | null,
    setWorkdir: React.Dispatch<React.SetStateAction<string | null>>

    recentDirs: string[],
    setRecentDirs: React.Dispatch<React.SetStateAction<string[]>>

    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;