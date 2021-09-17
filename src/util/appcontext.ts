import { createContext } from "react";

type AppContextType = {
    workdir: string | null,
    setWorkdir: React.Dispatch<React.SetStateAction<string | null>>

    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

const AppContext = createContext<AppContextType | null>(null);

export default AppContext;