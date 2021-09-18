import React from "react";
import Icon from "../Icon";

import './view-placeholder.scss';

const ViewPlaceholder: React.FC = () => {
    return (<div className="view-placeholder">
        <div className="view-placeholder__message">
            <div className="view-placeholder__header">
                <Icon name="report" /><h1>Nothing here...</h1>
            </div>
            <p>To get started, please open one of the files in the bar on the right</p>
        </div>
    </div>);
}

export default ViewPlaceholder;