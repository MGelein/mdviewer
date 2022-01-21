import React, { CSSProperties, useEffect, useState, useMemo, useCallback } from "react";
import getCaretRect from "../../util/caret";
import { useApp } from "../../util/hooks";
import { filenameToDisplay } from "../../util/string";

import './autocomplete.scss';

const controlKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'];

type Props = {
    onCancel(): void;
    onSubmit(value: string, query: string): void;
}

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const Autocomplete: React.FC<Props> = ({ onCancel, onSubmit }) => {
    const [selected, setSelected] = useState(0);
    const { files } = useApp();
    const [query, setQuery] = useState('');
    const rect = getCaretRect();
    const [{ top, left }, setCoord] = useState({ top: rect?.top ?? 0, left: rect?.left ?? 0 });
    const style: CSSProperties = { top, left };
    const filtered = useMemo(() => {
        const preparedQuery = escapeRegExp(query).toLowerCase().replace(/\s/g, '-');
        const queryRegex = new RegExp(preparedQuery, 'gi');
        return files.filter(file => file.match(queryRegex));
    }, [files, query]);

    const updatePosition = useCallback(() => {
        const rect = getCaretRect()
        if (rect) setCoord({ top: rect.top, left: rect.left });
    }, [setCoord]);

    const submit = useCallback(() => {
        const filename = filtered[selected];
        onSubmit(filenameToDisplay(filename), query)
    }, [onSubmit, filtered, selected, query]);

    useEffect(() => {
        updatePosition();
        const inputListener = (e: Event) => {
            const event = e as InputEvent;

            if (event.inputType === 'insertText') {
                if ('[]'.includes(event.data ?? 'no')) return;
                setQuery(query => query + event.data);
            } else if (event.inputType === 'deleteContentBackward') {
                setQuery(query => {
                    if (query.length < 1) setTimeout(onCancel, 1);
                    const newQuery = query.substr(0, query.length - 1);
                    return newQuery;
                });
            }
        };

        const controlListener = (e: KeyboardEvent) => {
            if (controlKeys.includes(e.key)) e.preventDefault();

            if (e.key === 'ArrowUp') {
                setSelected(previous => Math.max(0, previous - 1));
            }
            else if (e.key === 'ArrowDown') {
                setSelected(previous => Math.min(filtered.length - 1, previous + 1));
            } else if (e.key === 'Enter') {
                setTimeout(submit, 1);
            }
        }

        document.addEventListener('input', inputListener);
        document.addEventListener('keydown', controlListener);
        return () => {
            document.removeEventListener('input', inputListener);
            document.removeEventListener('keydown', controlListener);
        }
    }, [onCancel, updatePosition, filtered, submit]);

    return (<>
        {filtered.length > 0 && <div style={style} className="autocomplete">
            {filtered.map((file, index) => {
                const classes = `autocomplete__option ${selected === index ? 'selected' : ''}`;
                return <span
                    className={classes}
                    key={index}
                >
                    {file}
                </span>
            })}
        </div>}
    </>);
}

export default Autocomplete;