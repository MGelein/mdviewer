import React, { useEffect, useRef, useState } from "react";
import { replaceAutoComplete } from "../../util/caret";
import { useApp } from "../../util/hooks";
import Autocomplete from "../Autocomplete";

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
    md = md.replace(/([_*][_*][^_*]+?[_*][_*])/g, markup("bold"));
    md = md.replace(/([^_*][_*][^_*]+?[_*][^_*])/g, markup("italics"));
    md = md.replace(/(`[^`]+?`)/g, markup("code-inline"));
    md = md.replace(/(!?\[.*]\(.*?\))/g, markup("anchor"));
    md = md.replace(/(~~[^~].+?~~)/g, markup("strikethrough"));
    md = md.replace(/(\{[^}]+?})/g, markup("bullet"));
    md = md.replace(/(CMD\(.+?\))/gi, markup('command'));
    return md;
}

const MDEdit: React.FC = () => {
    const { fileData } = useApp();
    const [autocomplete, setAutocomplete] = useState(false);
    const markdown = useRef<HTMLDivElement>();
    const markup = useRef<HTMLDivElement>();

    const onInput = () => {
        if (!markdown.current || !markup.current) return;
        const markdownText = markdown.current.innerHTML;
        const markdownLines = markdownText.split('\n');
        const markupText = markupMarkdownLines(markdownLines);
        markup.current.innerHTML = markupText;
    }

    const onKeyDown = ({ key }: React.KeyboardEvent) => {
        if (key === '[') setAutocomplete(true);
        else if (key === ']' || key === 'Escape') setAutocomplete(false);
    }

    useEffect(() => {
        Object.keys(lineCache).forEach(line => delete lineCache[line]);

        markdown.current = document.querySelector('.md-edit__markdown') as HTMLDivElement;
        markup.current = document.querySelector('.md-edit__markup') as HTMLDivElement;

        if (markdown.current) markdown.current.innerHTML = fileData;
        onInput();
    }, [fileData]);

    return (<>
        <div className="md-edit">
            <div className="md-edit__markup"></div>
            <div className="md-edit__markdown" onKeyDown={onKeyDown} contentEditable onInput={onInput}></div>
        </div>
        {autocomplete && <Autocomplete
            onCancel={() => setAutocomplete(false)}
            onSubmit={(value: string, query: string) => {
                setAutocomplete(false);
                replaceAutoComplete(value, query, "]()");
                onInput();
            }}
        />}
    </>);
}

export default MDEdit;