import React from "react";
import { useApp } from "../../util/hooks";
import MDPreview from "../MDPreview";
import ViewControls from "../ViewControls";
import ViewPlaceholder from "../ViewPlaceholder";

import './file-view.scss';

const FileView: React.FC = () => {
    const { openFiles, fileData } = useApp();
    const anyOpenFileClass = openFiles.length > 0 ? 'any-open' : '';

    return (<div className={`file-view ${anyOpenFileClass}`}>
        {fileData.length > 1 ?
            <>
                <ViewControls />
                <MDPreview />
            </>
            :
            <ViewPlaceholder />
        }
    </div>);
}

export default FileView;