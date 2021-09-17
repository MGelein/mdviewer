import React from "react";
import { useApp } from "../../util/hooks";

import './side-bar.scss';

const SideBar: React.FC = () => {
    const { files } = useApp();
    return <div className="side-bar"></div>
}

export default SideBar;