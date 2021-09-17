import React from "react"

import './directory-picker.scss';

type Props = {
    onChange: (url: string) => void;
    className?: string;
    id: string;
}

const DirectoryPicker: React.FC<Props> = ({ onChange, className = "", id }) => {
    //@ts-ignore
    return <input id={id} className={`directory-picker ${className}`} nwdirectory="" type="file" onChange={(e) => onChange(e.target.value)} />
}

export default DirectoryPicker;