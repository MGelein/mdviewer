import React, { useCallback } from "react";
import { saveMarkdown } from "../../util/file";
import { useApp, useHotkey } from "../../util/hooks";
import OpenTab from "../OpenTab";

import './open-nav.scss';

const OpenNav: React.FC = () => {
    const { openFiles, focusFile, workdir, setFocusFile } = useApp();

    const changeTab = useCallback((direction: 1 | -1) => {
        if (!focusFile || openFiles.length <= 1) return;
        const tabIndex = openFiles.indexOf(focusFile);
        saveMarkdown(focusFile, workdir);
        const nextIndex = (tabIndex + direction) + openFiles.length;
        const nextFile = openFiles[nextIndex % openFiles.length];
        setFocusFile(nextFile);
    }, [focusFile, openFiles, workdir, setFocusFile]);

    useHotkey('ctrl+tab', () => changeTab(1));
    useHotkey('ctrl+shift+tab', () => changeTab(-1));

    return (<nav className="open-nav">
        {openFiles.map((openFile, index) => {
            return <OpenTab url={openFile} key={index} />
        })}
    </nav>);
}

export default OpenNav;