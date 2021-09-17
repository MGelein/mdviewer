import React from "react";
import { canOpenFileType, getFileType, typeToIcon } from "../../util/file";
import { useApp } from "../../util/hooks";
import FileTypeBadge from "../FileTypeBadge";

import './file-entry.scss';

type Props = {
    url: string;
}

const FileEntry: React.FC<Props> = ({ url }) => {
    const { focusFile, setFocusFile, openFiles } = useApp();
    const { workdir } = useApp();
    const type = getFileType(url, workdir);
    const isFocusFile = focusFile === url;
    const isOpenFile = openFiles.includes(url);
    const canOpen = canOpenFileType(type);
    const classes = `file-entry ${isFocusFile ? 'focus' : ''} ${isOpenFile ? 'open' : ''} ${canOpen ? 'editable' : ''}`;

    const openFile = () => {
        setFocusFile(url);
    }

    return <div onClick={canOpen ? openFile : undefined} className={classes}>
        <FileTypeBadge type={type} />
        {url}
    </div>
}

export default FileEntry;