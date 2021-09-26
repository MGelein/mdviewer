import React from 'react';

import './input-label.scss';

type Props = {
    label?: string;
}

const InputLabel: React.FC<Props> = ({ label, children }) => {
    return (<label className="input-label">
        <span className="input-label__label">{label ? label : ''}</span>
        {children}
    </label>);
}

export default InputLabel;