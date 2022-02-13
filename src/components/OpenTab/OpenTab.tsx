import React from "react";
import { useNav } from "../../util/hooks";
import { filenameToDisplay } from "../../util/string";
import Icon from "../Icon";

import './open-tab.scss';

type Props = {
    url: string;
}

const OpenTab: React.FC<Props> = ({ url }) => {
    const { closeTab, setFocusTab, focusFile } = useNav();

    const closeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        closeTab(url);
    }

    return (<div onClick={() => setFocusTab(url)} className={`open-tab ${focusFile === url ? 'focus' : ''}`}>
        {filenameToDisplay(url)}
        <div className="open-tab__close" onClick={closeFile}><Icon name="close" /></div>
    </div>);
}

export default OpenTab;