import React, { useEffect, useState } from "react";
import { useAnimState, useApp, useKeyDown } from "../../util/hooks";
import Button from "../Button";
import FileEntry from "../FileEntry";
import Icon from "../Icon";

import './side-bar.scss';

const SideBar: React.FC = () => {
    const [animState] = useAnimState();
    const [query, setQuery] = useState('');
    const { files } = useApp();
    const [filtered, setFiltered] = useState<string[]>([...files]);

    useEffect(() => {
        const regex = new RegExp(query.replace(/\s/g, '-'), 'gi')
        setFiltered([...files.filter(file => file.match(regex))])
    }, [setFiltered, files, query]);

    useKeyDown('Escape', () => {
        setQuery('');
        document.getElementById('searchField')?.blur();
    });

    return <div className={`side-bar ${animState}`}>
        <div className="side-bar__search">
            <input
                id="searchField"
                type="text"
                value={query}
                className="side-bar__search-field"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button size="small"><Icon name="search" /></Button>
        </div>
        <div className="side-bar__explorer">
            <div className="side-bar__explorer-list">
                {filtered && filtered.map((file, index) => {
                    return <FileEntry url={file} key={index} />
                })}
            </div>
        </div>
    </div>
}

export default SideBar;