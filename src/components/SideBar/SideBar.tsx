import React, { useEffect, useState } from "react";
import { canOpenFileType, createFileFromTemplate, getFileType } from "../../util/file";
import { useAnimState, useApp, useKeyDown } from "../../util/hooks";
import { basename } from "path";
import Button from "../Button";
import FileEntry from "../FileEntry";
import Icon from "../Icon";
import TemplatePicker from "../TemplatePicker/";

import './side-bar.scss';
import Settings from "../Settings";

function getNumberInName(name: string) {
    return parseInt(name.split('.')[0], 10);
}

function compareFilenames(nameA: string, nameB: string) {
    const numberA = getNumberInName(nameA);
    if (isNaN(numberA)) return nameA.localeCompare(nameB);
    const numberB = getNumberInName(nameB);
    if (isNaN(numberB)) return nameA.localeCompare(nameB);
    return numberA - numberB;
}

const SideBar: React.FC = () => {
    const { workdir, setFocusFile } = useApp();
    const [animState] = useAnimState();
    const [query, setQuery] = useState('');
    const [showNew, setShowNew] = useState(false);
    const [settings, setSettings] = useState(false);
    const { files } = useApp();
    const [filtered, setFiltered] = useState<string[]>([...files]);
    const directoryName = workdir ? basename(workdir) : '';

    useEffect(() => {
        const regex = new RegExp(query.replace(/\s/g, '-'), 'gi')
        setFiltered([...files.filter(file => {
            return file.match(regex) && canOpenFileType(getFileType(file, workdir));
        })].sort(compareFilenames));
    }, [setFiltered, files, query, workdir]);

    useKeyDown('Escape', () => {
        setQuery('');
        document.getElementById('searchField')?.blur();
    });

    return <div className={`side-bar ${animState}`}>
        <div className="side-bar__search">
            <label className="side-bar__search-label">
                <Icon name={query.length < 1 ? "search" : "close"} />
                <input
                    autoComplete="off"
                    id="searchField"
                    type="text"
                    value={query}
                    className="side-bar__search-field"
                    placeholder="Search..."
                    onChange={(e) => setQuery(e.target.value)}
                    onClick={() => setQuery('')}
                />
            </label>
            <Button title="Settings" size="small" onClick={() => setSettings(true)}>
                <Icon name="settings" />
            </Button>
        </div>
        <div className="side-bar__explorer">
            <div className="side-bar__explorer-controls">
                <span className="side-bar__explorer-workdir">
                    <Icon name="home" />{directoryName}
                </span>
                <div>
                    <Button onClick={() => setShowNew(true)} size="small" color="foreground" title="Create file"><Icon name="note add" /></Button>
                </div>
            </div>
            <div className="side-bar__explorer-list">
                {filtered && filtered.map((file, index) => {
                    return <FileEntry url={file} key={index} />
                })}
            </div>
        </div>
        {showNew && <TemplatePicker
            onClose={() => setShowNew(false)}
            onSubmit={async (name, template) => {
                const filename = await createFileFromTemplate(name, template, workdir);
                if (filename) setFocusFile(filename);
            }}
        />}
        {settings && <Settings onClose={() => setSettings(false)} />}
    </div >
}

export default SideBar;