import React, { useEffect, useState } from "react";
import { fileExists, loadTemplates } from "../../util/file";
import { useAnimState, useApp } from "../../util/hooks";
import { capitalizeWords, removeExtension } from "../../util/string";
import Button from "../Button";
import CustomSelect from "../CustomSelect";
import InputLabel from "../InputLabel";
import Icon from "../Icon";

import './template-picker.scss';

type Props = {
    onClose(): void;
    onSubmit(name: string, template: string): void;
}

const TemplatePicker: React.FC<Props> = ({ onClose, onSubmit }) => {
    const { workdir } = useApp();
    const [filename, setFilename] = useState('');
    const [animState, setAnimState] = useAnimState('opening', onClose);
    const [templates, setTemplates] = useState<string[]>([]);
    const [template, setTemplate] = useState<string>('None');
    const [nameError, setNameError] = useState<string>();

    useEffect(() => {
        if (!workdir) return;
        (async () => {
            const loaded = await loadTemplates(workdir);
            const niceNames = loaded.map(templateName => {
                return capitalizeWords(removeExtension(templateName));
            })
            setTemplates(['None', ...niceNames]);

            const filenameInput = document.querySelector('.template-picker__filename-input');
            if (!filenameInput) return;
            (filenameInput as HTMLInputElement).focus();
        })();
    }, [setTemplates, workdir]);

    const submit = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (nameError) return;
        setAnimState('closing');
        onSubmit(filename, template);
    }

    useEffect(() => {
        if (filename.length < 1) return setNameError('No filename given');
        if (fileExists(filename, workdir)) return setNameError('File already exists');
        setNameError('');
    }, [filename, workdir]);

    return (<div onClick={() => setAnimState('closing')} className={`template-picker__wrap ${animState}`}>
        <div className="template-picker" onClick={(e) => e.stopPropagation()}>
            <h3 className="template-picker__header">Create New File</h3>
            <form className="template-picker__form" onSubmit={submit}>
                <InputLabel label="Template">
                    <CustomSelect
                        className="template-picker__template-select"
                        options={templates}
                        onChange={(value) => setTemplate(value)}
                    />
                </InputLabel>
                <InputLabel label="Filename">
                    <input
                        className="template-picker__filename-input"
                        type="text"
                        value={filename}
                        onChange={(e) => setFilename(e.target.value)}
                        onKeyDown={({ key }) => {
                            if (key === 'Escape') setAnimState('closing');
                        }}
                        placeholder="Type your filename here"
                    />
                    {nameError && <span className="template-picker__filename-error">{nameError}</span>}
                </InputLabel>
            </form>
            <div className="template-picker__buttons">
                <Button disabled={!!nameError} onClick={() => submit()}><Icon name="Add" /><span>Create New File</span></Button>
                <Button onClick={() => setAnimState('closing')} color='foreground'><Icon name="Close" /><span>Cancel</span></Button>
            </div>
        </div>
    </div>);
}

export default TemplatePicker;