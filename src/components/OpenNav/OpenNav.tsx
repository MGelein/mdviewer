import React from "react";
import { useHotkey, useNav } from "../../util/hooks";
import OpenTab from "../OpenTab";

import './open-nav.scss';

const OpenNav: React.FC = () => {
    const { changeTab, closeFocusTab, openFiles } = useNav();

    useHotkey('ctrl+tab', () => changeTab(1));
    useHotkey('ctrl+shift+tab', () => changeTab(-1));
    useHotkey('ctrl+w', closeFocusTab);

    return (<nav className="open-nav">
        {openFiles.map((openFile, index) => {
            return <OpenTab url={openFile} key={index} />
        })}
    </nav>);
}

export default OpenNav;