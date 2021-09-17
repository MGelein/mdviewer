import React from "react";
import { useAnimState, useApp } from "../../util/hooks";
import Button from "../Button";
import Icon from "../Icon";

import './error-dialog.scss';


const ErrorDialog: React.FC = () => {
    const { error, setError } = useApp();
    const [wrapState, setWrapState] = useAnimState('opening', () => setError(null));
    const [dialogState, setDialogState] = useAnimState();
    const onClick = () => {
        setWrapState('closing');
        setDialogState('closing');
    }

    return (<div className={`error-dialog-wrap ${wrapState}`} onClick={onClick}>
        <div className={`error-dialog ${dialogState}`}>
            <h1>Oops, something went wrong!</h1>
            <p className="error-dialog__text">{error}</p>
            <Button><Icon name="check" />OK</Button>
        </div>
    </div>);
}

export default ErrorDialog;