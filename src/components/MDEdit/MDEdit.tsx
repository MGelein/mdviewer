import React, { useEffect, useRef } from "react";
import { useApp } from "../../util/hooks";

import './md-edit.scss';

const lineCache: Record<string, string> = {};

function markup(className: string) {
    return `<span class="${className}">$1</span>`;
}

function markupMarkdownLines(mdLines: string[]) {
    const outputLines = mdLines.map(line => {
        if (line in lineCache) return lineCache[line];
        lineCache[line] = markupMarkdown(line);
        return lineCache[line];
    });
    return outputLines.join('\n');
}

function markupMarkdown(md: string) {
    md = md.replace(/(#+.+)/g, markup("header"));
    md = md.replace(/([_*][_*][^_*]+[_*][_*])/g, markup("bold"));
    md = md.replace(/([^_*][_*][^_*]+[_*][^_*])/g, markup("italics"));
    md = md.replace(/(`[^`]+`)/g, markup("code-inline"));
    md = md.replace(/(!?\[.*]\(.*\))/g, markup("link"));
    md = md.replace(/(~~[^~].+~~)/g, markup("strikethrough"));
    md = md.replace(/(\{[^}]+})/g, markup("bullet"));
    md = md.replace(/(CMD\(.+\))/gi, markup('command'));
    return md;
}

const MDEdit: React.FC = () => {
    const { fileData } = useApp();
    const markdown = useRef<HTMLDivElement>();
    const markup = useRef<HTMLDivElement>();

    const onInput = () => {
        if (!markdown.current || !markup.current) return;
        const markdownText = markdown.current.innerText;
        const markdownLines = markdownText.split('\n');
        const markupText = markupMarkdownLines(markdownLines);
        markup.current.innerHTML = markupText;
    }

    useEffect(() => {
        Object.keys(lineCache).forEach(line => delete lineCache[line]);

        markdown.current = document.querySelector('.md-edit__markdown') as HTMLDivElement;
        markup.current = document.querySelector('.md-edit__markup') as HTMLDivElement;

        if (markdown.current) markdown.current.innerHTML = fileData;
        onInput();
    }, [fileData]);

    return (<div className="md-edit">
        <div className="md-edit__markup"></div>
        <div className="md-edit__markdown" contentEditable onInput={onInput}></div>
    </div>);
}

export default MDEdit;