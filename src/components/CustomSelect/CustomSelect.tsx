import React, { useEffect, useState } from "react";
import Icon from "../Icon";

import './custom-select.scss';

type Props = {
    options: string[];
    onChange(value: string): void;
    className?: string;
}

const CustomSelect: React.FC<Props> = ({ options, onChange, className }) => {
    const [selected, setSelected] = useState(options[0]);
    const [expanded, setExpanded] = useState(false);
    const selectedClass = ['custom-select__selected'];
    if (expanded) selectedClass.push('expanded');

    const toggleExpanded = () => setTimeout(() => setExpanded(previously => !previously), 100);

    useEffect(() => onChange(selected), [selected, onChange]);
    useEffect(() => setSelected(options[0]), [options]);

    return (<div className={`custom-select ${className}`} onClick={toggleExpanded}>
        <div className={selectedClass.join(' ')}>
            {selected}
            <Icon name="Expand More" />
        </div>
        {expanded &&
            <div className="custom-select__options">
                {options.filter(option => option !== selected).map(option => {
                    return <div
                        key={option}
                        className="custom-select__option"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelected(option);
                            setExpanded(false);
                        }}
                    >
                        {option}
                    </div>
                })}
            </div>
        }
    </div>);
}

export default CustomSelect;