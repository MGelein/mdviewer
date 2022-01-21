import React from "react";
import { useHotkey } from "../../util/hooks";
import { getHotkeyDescription } from "../../util/hotkey";

import './button.scss';

type Props = {
    color?: 'accent' | 'foreground' | 'background';
    onClick?: () => void;
    size?: 'small' | 'large';
    title?: string,
    disabled?: boolean,
    hotkey?: string;
}

const Button: React.FC<Props> = ({ title, onClick, children, color = "accent", size = "large", disabled = false, hotkey }) => {
    const fgColor = color === 'background' ? 'foreground' : 'light';
    const disabledClass = disabled ? 'disabled' : '';

    useHotkey(hotkey, onClick);

    return <button
        className={`button ${size} ${disabledClass}`}
        style={{
            background: `var(--color-${color})`,
            color: `var(--color-${fgColor})`
        }}
        title={`${title}${getHotkeyDescription(hotkey)}`}
        onClick={onClick}>
        {children}
    </button>
}

export default Button;