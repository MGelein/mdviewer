import React, { useEffect, useState } from "react";
import AppContext from "../../util/appcontext";

const AppContextProvider: React.FC = ({ children }) => {
    const [workdir, setWorkdir] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

    }, []);

    return (<AppContext.Provider value={{
        workdir, setWorkdir,
        error, setError,
    }}>{children}</AppContext.Provider>);
}

export default AppContextProvider;