import React, { useRef } from "react";
import { useAnimState, useApp } from "../../util/hooks";
import Button from "../Button";
import Icon from "../Icon";
import InputLabel from "../InputLabel";
import CustomSelect from "../CustomSelect";
import { Theme } from "../../util/types";

import './settings.scss';

type Props = {
    onClose(): void;
}

const Settings: React.FC<Props> = ({ onClose }) => {
    const { setTheme, theme } = useApp();
    const [animState, setAnimState] = useAnimState('opening', () => onClose());
    const pickedTheme = useRef<Theme>(theme);

    const saveAndClose = () => {
        setTheme(pickedTheme.current);
        close();
    }
    const close = () => setAnimState('closing');

    return (<div onClick={() => setAnimState('closing')} className={`settings-wrap ${animState}`}>
        <div className={`settings ${animState}`} onClick={(e) => e.stopPropagation()}>
            <div className="settings__header">
                <h3>Settings</h3>
            </div>
            <div className="settings__contents">
                <InputLabel label="Theme">
                    <CustomSelect
                        className="template-picker__template-select"
                        options={theme === 'light' ? ['light', 'dark'] : ['dark', 'light']}
                        onChange={(value) => pickedTheme.current = value.toLowerCase() as Theme}
                    />
                </InputLabel>
            </div>
            <div className="settings__buttons">
                <Button onClick={saveAndClose} color='accent'><Icon name="Save" /><span>Save &amp; Close</span></Button>
                <Button onClick={close} color='foreground'><Icon name="Close" /><span>Cancel</span></Button>
            </div>
        </div>
    </div >);
}

export default Settings;