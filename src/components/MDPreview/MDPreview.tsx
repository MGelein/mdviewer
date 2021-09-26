import React, { useMemo } from "react";
import marked from 'marked';
import { useApp } from "../../util/hooks";

import './md-preview.scss';

const insertExtendedSyntax = (html: string) => {
    html = html.replace(/\{(RP)}/gi, markup("bullet green"));
    html = html.replace(/\{(CMBT)}/gi, markup("bullet red"));
    html = html.replace(/\{(PZL)}/gi, markup("bullet cyan"));
    html = html.replace(/\{(CHL)}/gi, markup("bullet yellow"));
    html = html.replace(/\{([^}]+?)}/gi, markup("bullet background"));
    html = html.replace(/(CMD\(.+?\))/gi, markup('command'));
    return html;
}

function markup(className: string) {
    return `<span class="${className}">$1</span>`;
}

const MDPreview: React.FC = () => {
    const { fileData } = useApp();
    const markup = useMemo(() => marked(fileData), [fileData]);
    const html = useMemo(() => insertExtendedSyntax(markup), [markup]);

    return <div className="md-preview"
        dangerouslySetInnerHTML={{ __html: html }}
    ></div>
}

export default MDPreview;