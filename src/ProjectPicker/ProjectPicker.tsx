import React from "react";
import Button from "../components/Button";

import './project-picker.scss';

const ProjectPicker: React.FC = () => {
    return (<div className="project-picker-wrap">
        <div className="project-picker">
            <h1 className="project-picker__header">Welcome!</h1>
            <p>
                This page shows your most recent projects, so you can quickly
                open them. However you can also choose to create a new project
                from here!
            </p>
            <Button onClick={() => console.log}>New Project</Button>
            <h2 className="project-picker__header">Recent Projects</h2>
        </div>
    </div>);
}

export default ProjectPicker;