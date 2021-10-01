import React from "react";
import { saveMarkdown } from "../../util/file";
import { useApp } from "../../util/hooks";
import { filenameToDisplay } from "../../util/string";
import Icon from "../Icon";

import './open-tab.scss';

type Props = {
    url: string;
}

const OpenTab: React.FC<Props> = ({ url }) => {
    const { focusFile, setFocusFile, setOpenFiles, editModes, workdir } = useApp();
    const isFocusFile = url === focusFile;

    const makeFocus = () => {
        if (isFocusFile) return;
        saveMarkdown(focusFile, workdir);
        setFocusFile(url);
    }

    const closeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpenFiles(files => {
            const currentIndex = files.indexOf(url);
            if (isFocusFile) {
                const newFocusFile = files[currentIndex + 1 < files.length ? currentIndex + 1 : currentIndex - 1];
                setFocusFile(newFocusFile);
            }

            const newFiles = files.filter((openFile) => {
                return openFile !== url;
            });
            delete editModes[url];
            return newFiles;
        });
    }

    return (<div onClick={isFocusFile ? undefined : makeFocus} className={`open-tab ${isFocusFile ? 'focus' : ''}`}>
        {filenameToDisplay(url)}
        <div className="open-tab__close" onClick={closeFile}><Icon name="close" /></div>
    </div>);
}

export default OpenTab;