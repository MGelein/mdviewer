import React, { useEffect, useState } from "react";

import './custom-select.scss';

type Props = {
    options: string[];
    onChange(value: string): void;
    className?: string;
}

const CustomSelect: React.FC<Props> = ({ options, onChange, className }) => {
    const [selected, setSelected] = useState(options[0]);
    const [expanded, setExpanded] = useState(false);

    const togglExpanded = () => setTimeout(() => setExpanded(previously => !previously), 100);

    useEffect(() => onChange(selected), [selected, onChange]);
    useEffect(() => setSelected(options[0]), [options]);

    return (<div className={`custom-select ${className}`} onClick={togglExpanded}>
        <div className="custom-select__selected">{selected}</div>
        {expanded &&
            <div className="custom-select__options">
                {options.filter(option => option !== selected).map(option => {
                    return <div
                        key={option}
                        className="custom-select__option"
                        onClick={(e) => setSelected(option)}
                    >
                        {option}
                    </div>
                })}
            </div>
        }
    </div>);
}

export default CustomSelect;