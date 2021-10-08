import React from "react";

import 'dropdown.scss';
import Icon from "../Icon";

export type DropDownOption = {
    value: string,
    icon?: string,
}

type Props = {
    options: DropDownOption[];
}

const Dropdown: React.FC<Props> = ({ options }) => {
    return (<select className="dropdown">
        {options.map(({ value, icon }) => {
            return (<option key={value} value={value}>
                {icon ? <Icon name={icon} /> : ''}
                {value}
            </option>);
        })}
    </select>)
}

export default Dropdown;