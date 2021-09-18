import React from "react";

import './button.scss';

type Props = {
    color?: 'accent' | 'foreground' | 'background';
    onClick?: () => void;
    size?: 'small' | 'large';
    title?: string,
}

const Button: React.FC<Props> = ({ title, onClick, color = "accent", children, size = "large" }) => {
    const fgColor = color === 'accent' ? 'light' : 'foreground';
    return <button
        className={`button ${size}`}
        style={{
            background: `var(--color-${color})`,
            color: `var(--color-${fgColor})`
        }}
        title={title}
        onClick={onClick}>
        {children}
    </button>
}

export default Button;