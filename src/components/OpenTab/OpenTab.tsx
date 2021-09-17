import React from "react";
import { useApp } from "../../util/hooks";
import Icon from "../Icon";

import './open-tab.scss';

type Props = {
    url: string;
}

const OpenTab: React.FC<Props> = ({ url }) => {
    const { focusFile, setFocusFile, setOpenFiles } = useApp();
    const isFocusFile = url === focusFile;

    const makeFocus = () => {
        if (!isFocusFile) setFocusFile(url);
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
            return newFiles;
        });
    }

    return (<div onClick={isFocusFile ? undefined : makeFocus} className={`open-tab ${isFocusFile ? 'focus' : ''}`}>
        {url}
        <div className="open-tab__close" onClick={closeFile}><Icon name="close" /></div>
    </div>);
}

export default OpenTab;