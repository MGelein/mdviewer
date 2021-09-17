import React from "react";
import { useApp, useDirectory } from "../../util/hooks";

import './side-bar.scss';

const SideBar: React.FC = () => {
    const { workdir } = useApp();
    useDirectory(workdir, (filename) => console.log(filename));
    return <div className="side-bar"></div>
}

export default SideBar;