import React from "react";
import { useApp } from "../../util/hooks";
import OpenTab from "../OpenTab";

import './open-nav.scss';

const OpenNav: React.FC = () => {
    const { openFiles } = useApp();

    return (<nav className="open-nav">
        {openFiles.map((openFile, index) => {
            return <OpenTab url={openFile} key={index} />
        })}
    </nav>);
}

export default OpenNav;