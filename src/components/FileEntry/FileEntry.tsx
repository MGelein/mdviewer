import React from "react";
import { getFileType } from "../../util/file";
import { useApp } from "../../util/hooks";
import FileTypeBadge from "../FileTypeBadge";

import './file-entry.scss';

type Props = {
    url: string;
}

const FileEntry: React.FC<Props> = ({ url }) => {
    const { workdir } = useApp();
    const type = getFileType(url, workdir);
    return <div className="file-entry">
        <FileTypeBadge type={type} />
        {url}
    </div>
}

export default FileEntry;