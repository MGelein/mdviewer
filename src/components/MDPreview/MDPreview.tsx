import React, { useCallback, useEffect, useMemo } from "react";
import marked from 'marked';
import { exec } from "child_process";
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
    const { fileData, workdir, setFocusFile } = useApp();
    const markup = useMemo(() => marked(fileData), [fileData]);
    const html = useMemo(() => insertExtendedSyntax(markup), [markup]);

    const openLink = useCallback((e: Event) => {
        e.preventDefault();
        const link = (e.target as HTMLAnchorElement);
        const linkHref = link.getAttribute('href');
        const linkText = linkHref || link.innerText;
        const fileName = linkText.replace(/\s/g, '-').toLowerCase() + '.md';
        setFocusFile(fileName);
    }, [setFocusFile]);

    const executeCommand = useCallback((e: Event) => {
        const commandText = (e.target as HTMLSpanElement).innerText;
        const command = commandText.replace(/CMD\((.+?)\)/gi, '$1');
        exec(`start cmd.exe /K "cd ${workdir}  & ${command}"`);
    }, [workdir]);

    useEffect(() => {
        const commands = document.querySelectorAll('.command');
        commands.forEach(command => {
            command.addEventListener('click', executeCommand);
        });

        const links = document.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', openLink);
        });

        return () => {
            commands.forEach((command) => {
                command.removeEventListener('click', executeCommand);
            });

            links.forEach((link) => {
                link.removeEventListener('click', openLink);
            });
        }
    }, [html, openLink, executeCommand]);

    return <div className="md-preview"
        dangerouslySetInnerHTML={{ __html: html }}
    ></div>
}

export default MDPreview;