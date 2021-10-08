import React from "react";
import { typeToIcon } from "../../util/file";

import './file-type-badge.scss';

type Props = {
    type: string;
};

const FileTypeBadge: React.FC<Props> = ({ type }) => {
    const icon = typeToIcon(type);
    return <span className="file-type-badge material-icons">{icon}</span>
}

export default FileTypeBadge;