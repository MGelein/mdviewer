import React from "react";

import './link.scss';

type Props = {
    onClick: () => void;
}

const Link: React.FC<Props> = ({ onClick, children }) => {
    return <button className="link" onClick={onClick}>{children}</button>
}

export default Link;