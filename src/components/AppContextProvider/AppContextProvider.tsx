import React, { useEffect, useState } from "react";
import AppContext from "../../util/appcontext";
import { useStorage } from "../../util/hooks";

const AppContextProvider: React.FC = ({ children }) => {
    const [workdir, setWorkdir] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [recentDirs, setRecentDirs] = useStorage<string[]>('recentDirs', []);

    useEffect(() => {

    }, []);

    return (<AppContext.Provider value={{
        workdir, setWorkdir,
        error, setError,
        recentDirs, setRecentDirs
    }}>{children}</AppContext.Provider>);
}

export default AppContextProvider;