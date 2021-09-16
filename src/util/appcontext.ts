import { createContext } from "react";

type AppContextType = {
    workdir: string | null,
    setWorkdir: React.Dispatch<React.SetStateAction<string | null>>

    recentDirs: string[],
    setRecentDirs: React.Dispatch<React.SetStateAction<string[]>>
}

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;