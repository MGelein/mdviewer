import React from "react";
import { useApp } from "../../util/hooks";
import Button from "../Button";
import FileEntry from "../FileEntry";
import Icon from "../Icon";

import './side-bar.scss';

const SideBar: React.FC = () => {
    const { files } = useApp();
    return <div className="side-bar">
        <div className="side-bar__search">
            <input type="text" className="side-bar__search-field" placeholder="Search..." />
            <Button size="small"><Icon name="search" /></Button>
        </div>
        <div className="side-bar__explorer">
            <div className="side-bar__explorer-list">
                {files && files.map((file, index) => {
                    return <FileEntry url={file} key={index} />
                })}
            </div>
        </div>
    </div>
}

export default SideBar;