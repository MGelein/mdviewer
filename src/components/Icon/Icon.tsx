import React from "react";

type Props = {
    name: string;
}

const Icon: React.FC<Props> = ({ name }) => {
    return <span className="material-icons">{name.toLowerCase().replace(/\s/g, '_')}</span>
}

export default Icon;