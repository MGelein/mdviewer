import React from "react";

import './button.scss';

type Props = {
    color?: 'accent' | 'foreground' | 'background';
    onClick?: () => void;
    size?: 'small' | 'large';
    title?: string,
    disabled?: boolean,
}

const Button: React.FC<Props> = ({ title, onClick, color = "accent", children, size = "large", disabled = false }) => {
    const fgColor = color === 'background' ? 'foreground' : 'light';
    const disabledClass = disabled ? 'disabled' : '';
    return <button
        className={`button ${size} ${disabledClass}`}
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