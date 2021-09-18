import React, { useMemo } from "react";
import marked from 'marked';
import { useApp } from "../../util/hooks";

import './md-preview.scss';

const MDPreview: React.FC = () => {
    const { fileData } = useApp();
    const html = useMemo(() => marked(fileData), [fileData, marked]);

    return (<div className="md-preview"
        dangerouslySetInnerHTML={{ __html: html }}
    ></div>)
}

export default MDPreview;