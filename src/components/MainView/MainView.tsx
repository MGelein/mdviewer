import React from "react"
import FileView from "../FileView";
import OpenNav from "../OpenNav";

import './main-view.scss';

const MainView: React.FC = () => {
    return (<div className="main-view">
        <OpenNav />
        <FileView />
    </div>);
}

export default MainView;