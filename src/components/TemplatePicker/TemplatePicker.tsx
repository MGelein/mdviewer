import React from "react";
import { useAnimState } from "../../util/hooks";

import './template-picker.scss';

type Props = {
    onClose(): void;
}

const TemplatePicker: React.FC<Props> = ({ onClose }) => {
    const [animState, setAnimState] = useAnimState('opening', onClose);
    return (<div onClick={() => setAnimState('closing')} className={`template-picker__wrap ${animState}`}>

    </div>);
}

export default TemplatePicker;