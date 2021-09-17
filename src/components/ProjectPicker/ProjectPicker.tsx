import React, { useState } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Link from "../Link";
import DirectoryPicker from "../DirectoryPicker";
import { useApp } from "../../util/hooks";
import { isDirEmpty } from "../../util/file";

import './project-picker.scss';

type PickerMode = "open" | "new";

const clickFilePicker = () => document.getElementById('directoryPicker')?.click();

const ProjectPicker: React.FC = () => {
    const { recentDirs, setError } = useApp();
    const [pickerMode, setPickerMode] = useState<PickerMode>('open');

    const openProject = () => {
        setPickerMode("open");
        clickFilePicker();
    }

    const newProject = () => {
        setPickerMode("new");
        clickFilePicker();
    }

    const pickFolder = async (url: string) => {
        const isEmpty = await isDirEmpty(url);
        if (pickerMode === 'new') {
            if (!isEmpty) return setError('You have to choose an empty directory to start a new project');
        } else if (pickerMode === 'open') {
            if (isEmpty) return setError('This directory does not contain any files, please select another directory');
        }
    }

    return (<div className="project-picker-wrap">
        <div className="project-picker">
            <h1 className="project-picker__header">Welcome!</h1>
            <p>
                Let's quickly get started by creating a new project or opening
                an existing one!
            </p>
            <div className="project-picker-buttons">
                <Button onClick={newProject}><Icon name="Add" />New Project</Button>
                <Button onClick={openProject}><Icon name="Folder Open" />
                    Open Project
                </Button>
                <DirectoryPicker id="directoryPicker" onChange={pickFolder} />
            </div>


            <h2 className="project-picker__header">Recent Projects</h2>
            {recentDirs.length < 1 ?
                <p>
                    Unfortunately, you do not seem to have any recent projects.
                    You can change this by making a new project.
                </p>
                :
                recentDirs.map((recentDir, index) => {
                    return <Link onClick={console.log}>{index + 1}.{recentDir}</Link>
                })
            }
        </div>
    </div>);
}

export default ProjectPicker;