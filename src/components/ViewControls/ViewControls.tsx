import React from "react";
import { saveMarkdown } from "../../util/file";
import { useApp } from "../../util/hooks";
import { EditMode } from "../../util/types";
import Icon from "../Icon";

import './view-controls.scss';

const ViewControls: React.FC = () => {
    const { editModes, setEditModes, focusFile, workdir } = useApp();
    const editMode: EditMode = focusFile ? editModes[focusFile] : 'preview';

    const changeMode = (mode: EditMode) => {
        if (!focusFile) return;
        const newModes = { ...editModes };
        newModes[focusFile] = mode;
        setEditModes(newModes);
    }
    const openEdit = () => changeMode('edit');
    const openPreview = () => {
        saveMarkdown(focusFile, workdir);
        changeMode('preview');
    };

    return <div className="view-controls">
        {editMode === 'edit' ?
            <>
                <span onClick={openPreview} title="Preview" className="view-controls__control">
                    <Icon name="visibility" />
                </span>
                <span onClick={() => saveMarkdown(focusFile, workdir)} title="Save" className="view-controls__control">
                    <Icon name="save" />
                </span>
            </>
            :
            <>
                <span onClick={openEdit} title="Edit" className="view-controls__control">
                    <Icon name="edit" />
                </span>
                <span title="Remove" className="view-controls__control">
                    <Icon name="delete" />
                </span>
            </>
        }
    </div>
}

export default ViewControls;