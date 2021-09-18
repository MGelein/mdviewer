import React from "react";
import { useApp } from "../../util/hooks";
import MDPreview from "../MDPreview";

import './file-view.scss';

const FileView: React.FC = () => {
    const { openFiles } = useApp();
    const anyOpenFileClass = openFiles.length > 0 ? 'any-open' : '';

    return (<div className={`file-view ${anyOpenFileClass}`}>
        <MDPreview />
    </div>);
}

export default FileView;