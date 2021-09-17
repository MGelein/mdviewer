import React from "react";
import { useApp } from "../../util/hooks";
import Button from "../Button";
import Icon from "../Icon";

import './side-bar.scss';

const SideBar: React.FC = () => {
    const { files } = useApp();
    return <div className="side-bar">
        <div className="side-bar__search">
            <input type="text" className="side-bar__search-field" placeholder="Search..." />
            <Button size="small"><Icon name="search" /></Button>
        </div>
        <div className="side-bar__explorer"></div>
    </div>
}

export default SideBar;