import React, { useState } from "react";
import { removeFile, saveMarkdown } from "../../util/file";
import { useApp } from "../../util/hooks";
import { EditMode } from "../../util/types";
import Button from "../Button";
import ConfirmDialog from "../ConfirmDialog";
import Icon from "../Icon";

import './view-controls.scss';

const ViewControls: React.FC = () => {
    const { editModes, setEditModes, focusFile, workdir, setFocusFile, setOpenFiles } = useApp();
    const editMode: EditMode = focusFile ? editModes[focusFile] : 'preview';
    const [deleting, setDeleting] = useState(false);

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

    const deleteFile = () => {
        setOpenFiles(files => {
            if (!focusFile || !workdir) return [...files];
            const url = focusFile;
            const currentIndex = files.indexOf(url);
            const newFocusFile = files[currentIndex + 1 < files.length ? currentIndex + 1 : currentIndex - 1];
            setFocusFile(newFocusFile);

            const newFiles = files.filter((openFile) => {
                return openFile !== url;
            });
            delete editModes[url];
            removeFile(url, workdir);
            return newFiles;
        });
    }

    return <div className="view-controls">
        {deleting && <ConfirmDialog
            onCancel={() => setDeleting(false)}
            onConfirm={() => {
                setDeleting(false);
                deleteFile();
            }}
            question="Do you really want to remove this file?" />}
        {editMode === 'edit' ?
            <>
                <Button onClick={openPreview} title="Preview" size="small" color="background" hotkey="ctrl+p">
                    <Icon name="visibility" />
                </Button>
                <Button onClick={() => saveMarkdown(focusFile, workdir)} title="Save" size="small" color="background" hotkey="ctrl+s">
                    <Icon name="save" />
                </Button>
            </>
            :
            <>
                <Button onClick={openEdit} title="Edit" size="small" color="background" hotkey="ctrl+e">
                    <Icon name="edit" />
                </Button>
                <Button title="Remove" onClick={() => setDeleting(true)} size="small" color="background" hotkey="ctrl+shift+d">
                    <Icon name="delete" />
                </Button>
            </>
        }
    </div>
}

export default ViewControls;