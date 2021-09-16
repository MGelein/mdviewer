import React from "react";

import './button.scss';

type Props = {
    color?: 'accent' | 'foreground' | 'background';
    onClick: () => void;
}

const Button: React.FC<Props> = ({ onClick, color = "accent", children }) => {
    const fgColor = color === 'accent' ? 'light' : 'foreground';
    return <button
        className="button"
        style={{
            background: `var(--color-${color})`,
            color: `var(--color-${fgColor})`
        }}
        onClick={onClick}>
        {children}
    </button>
}

export default Button;