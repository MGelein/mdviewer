import React from "react";
import Icon from "../Icon";

import './view-controls.scss';

const ViewControls: React.FC = () => {
    return <div className="view-controls">
        <span title="Edit" className="view-controls__control"><Icon name="edit" /></span>
        <span title="Preview" className="view-controls__control"><Icon name="visibility" /></span>
        <span title="Save" className="view-controls__control"><Icon name="save" /></span>
        <span title="Remove" className="view-controls__control"><Icon name="delete" /></span>
    </div>
}

export default ViewControls;