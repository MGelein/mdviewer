import React from "react";
import { useApp } from "../../util/hooks";
import { EditMode } from "../../util/types";
import MDPreview from "../MDPreview";
import ViewControls from "../ViewControls";
import ViewPlaceholder from "../ViewPlaceholder";

import './file-view.scss';

const FileView: React.FC = () => {
    const { openFiles, fileData, editModes, focusFile } = useApp();
    const editMode: EditMode = focusFile ? editModes[focusFile] : 'preview';
    const anyOpenFileClass = openFiles.length > 0 ? 'any-open' : '';

    return (<div className={`file-view ${anyOpenFileClass}`}>
        {fileData.length > 1 ?
            <>
                <ViewControls />
                {editMode === 'preview' && <MDPreview />}
                {editMode === 'edit' && <></>}
            </>
            :
            <ViewPlaceholder />
        }
    </div>);
}

export default FileView;