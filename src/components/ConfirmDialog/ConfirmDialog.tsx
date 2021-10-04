import React from "react";
import { useAnimState } from "../../util/hooks";
import Button from "../Button";
import Icon from "../Icon";

import './confirm-dialog.scss';

type Props = {
    question: string;
    onConfirm?(): void;
    onCancel?(): void;
}

const ConfirmDialog: React.FC<Props> = ({ question, onConfirm, onCancel }) => {
    const [animState, setAnimState] = useAnimState();

    const handleConfirm = () => {
        setAnimState('closing');
        setTimeout(() => onConfirm?.(), 500);
    }

    const handleCancel = () => {
        setAnimState('closing');
        setTimeout(() => onCancel?.(), 500);
    }
    return (<div className={`confirm-dialog-wrap ${animState}`}>
        <div className={`confirm-dialog ${animState}`}>
            <h2>Are you sure?</h2>
            <p className="confirm-dialog__question">{question}</p>
            <div className="confirm-dialog__buttons">
                <Button onClick={handleConfirm}><Icon name="check" />Confirm</Button>
                <Button onClick={handleCancel}><Icon name="close" />Cancel</Button>
            </div>
        </div>
    </div>)
}

export default ConfirmDialog;