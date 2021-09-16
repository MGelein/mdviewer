import React from "react";
import Button from "../components/Button";
import Icon from "../components/Icon";
import Link from "../components/Link";
import { useApp } from "../util/hooks";

import './project-picker.scss';

const ProjectPicker: React.FC = () => {
    const { recentDirs } = useApp();

    return (<div className="project-picker-wrap">
        <div className="project-picker">
            <h1 className="project-picker__header">Welcome!</h1>
            <p>
                Let's quickly get started by creating a new project or opening
                an existing one!
            </p>
            <div className="project-picker-buttons">
                <Button onClick={() => console.log}><Icon name="Add" />New Project</Button>
                <Button onClick={() => console.log}><Icon name="Folder Open" />Open Project</Button>
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