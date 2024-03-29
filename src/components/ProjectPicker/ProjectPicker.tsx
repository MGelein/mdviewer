import React, { useState, useRef } from "react";
import Button from "../Button";
import Icon from "../Icon";
import Link from "../Link";
import DirectoryPicker from "../DirectoryPicker";
import { useAnimState, useApp, useStorage } from "../../util/hooks";
import { createTemplateFolder, hasTemplateFolder, isDirEmpty } from "../../util/file";

import './project-picker.scss';

type PickerMode = "open" | "new";

const clickFilePicker = () => document.getElementById('directoryPicker')?.click();

const addRecentDir = (oldDirs: string[], newDir: string) => {
    const newDirIndex = oldDirs.indexOf(newDir);
    if (newDirIndex > -1) {
        oldDirs.splice(newDirIndex, 1);
        return [newDir, ...oldDirs];
    }
    return [newDir, ...oldDirs].slice(0, 5);
}

const ProjectPicker: React.FC = () => {
    const { setError, setWorkdir } = useApp();
    const loadDir = useRef('');
    const [animState, setAnimState] = useAnimState('opening', () => {
        setRecentDirs((dirs) => addRecentDir(dirs, loadDir.current));
        setWorkdir(loadDir.current);
    });
    const [recentDirs, setRecentDirs] = useStorage<string[]>('recentDirs', []);
    const [pickerMode, setPickerMode] = useState<PickerMode>('open');

    const loadProject = (url: string) => {
        setAnimState('closing');
        loadDir.current = url;
        if (!hasTemplateFolder(url)) createTemplateFolder(url);
    }

    const openProject = () => {
        setPickerMode("open");
        clickFilePicker();
    }

    const openRecentProject = (url: string) => {
        setPickerMode("open");
        pickFolder(url);
    }

    const newProject = () => {
        setPickerMode("new");
        clickFilePicker();
    }

    const pickFolder = async (url: string) => {
        const isEmpty = await isDirEmpty(url);
        if (pickerMode === 'new' && !isEmpty) {
            return setError('You have to choose an empty directory to start a new project');
        }
        loadProject(url);
    }

    return (<div className="project-picker-wrap">
        <div className={`project-picker ${animState}`}>
            <h1 className="project-picker__header">Welcome!</h1>
            <p>
                Let's quickly get started by creating a new project or opening
                an existing one!
            </p>
            <div className="project-picker-buttons">
                <Button onClick={newProject} hotkey="ctrl+n"><Icon name="Add" /><span>New Project</span></Button>
                <Button onClick={openProject} hotkey="ctrl+o"><Icon name="Folder Open" />
                    <span>Open Project</span>
                </Button>
                <DirectoryPicker id="directoryPicker" onChange={pickFolder} />
            </div>


            <h2 className="project-picker__header">Recent Projects</h2>
            {!recentDirs || recentDirs.length < 1 ?
                <p>
                    Unfortunately, you do not seem to have any recent projects.
                    You can change this by making a new project.
                </p>
                :
                recentDirs.map((recentDir, index) => {
                    return <Link key={index} onClick={() => openRecentProject(recentDir)}>{index + 1}.&nbsp;{recentDir}</Link>
                })
            }
        </div>
    </div>);
}

export default ProjectPicker;