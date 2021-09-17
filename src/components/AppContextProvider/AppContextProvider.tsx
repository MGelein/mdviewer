import React, { useState } from "react";
import AppContext from "../../util/appcontext";
import { useDirectory } from "../../util/hooks";

const AppContextProvider: React.FC = ({ children }) => {
    const [workdir, setWorkdir] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [files, setFiles] = useState<string[]>([]);
    useDirectory(workdir, setFiles);

    return (<AppContext.Provider value={{
        workdir, setWorkdir,
        error, setError,
        files,
    }}>{children}</AppContext.Provider>);
}

export default AppContextProvider;