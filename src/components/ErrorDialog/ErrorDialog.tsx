import React, { useEffect, useState } from "react";
import { useApp } from "../../util/hooks";
import Button from "../Button";
import Icon from "../Icon";

import './error-dialog.scss';

type AnimState = 'opening' | 'open' | 'closing';

const ErrorDialog: React.FC = () => {
    const { error, setError } = useApp();
    const [wrapState, setWrapState] = useState<AnimState>('opening');
    const [dialogState, setDialogState] = useState<AnimState>('opening');
    const onClick = () => {
        setWrapState('closing');
        setDialogState('closing');
    }

    useEffect(() => {
        if (wrapState === 'opening') setTimeout(() => setWrapState('open'), 500);
        if (wrapState === 'closing') setTimeout(() => setError(null), 500);
    }, [wrapState, setError]);

    useEffect(() => {
        if (dialogState === 'opening') setTimeout(() => setDialogState('open'), 500);
    }, [dialogState]);

    return (<div className={`error-dialog-wrap ${wrapState}`} onClick={onClick}>
        <div className={`error-dialog ${dialogState}`}>
            <h1>Oops, something went wrong!</h1>
            <p className="error-dialog__text">{error}</p>
            <Button><Icon name="check" />OK</Button>
        </div>
    </div>);
}

export default ErrorDialog;