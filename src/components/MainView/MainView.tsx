import React from "react"
import { useAnimState } from "../../util/hooks";
import FileView from "../FileView";
import OpenNav from "../OpenNav";

import './main-view.scss';

const MainView: React.FC = () => {
    const [animState] = useAnimState();

    return (<div className={`main-view ${animState}`}>
        <OpenNav />
        <FileView />
    </div>);
}

export default MainView;