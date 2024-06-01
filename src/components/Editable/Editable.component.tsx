import { Input } from "antd";
import { debounce } from 'lodash';
import { useEffect, useState } from "react";
import { onInputChange } from "../../lib/onInputChange";
import { EditableProps } from "./Editable.d";
import styles from './Editable.module.scss';
import clsx from "clsx";

export const EditableComponent = ({value, onChange, placeholder, textArea}:EditableProps) => { 
    const [curValue, setCurValue] = useState(value);

    const debouncedOnChange = debounce(onChange, 1000);

    useEffect(() => {
        if(value !== curValue) {
            setCurValue(value);
        }
    }, [value]);

    useEffect(() => {
        if(curValue !== value) {
            debouncedOnChange(curValue);
        }
        return debouncedOnChange.cancel;
    }, [curValue]);

    const [hasChanges, setHasChanges] = useState(curValue !== value);
    useEffect(() => {
        setHasChanges(curValue !== value);
    }, [curValue, value]);
    
    const Component = textArea ? Input.TextArea : Input;
    return <Component
        value={curValue}
        className={clsx([styles.editable, hasChanges && styles.hasChanges])}
        onChange={onInputChange(setCurValue)}
        onClick={e => {e.stopPropagation();}}
        placeholder={placeholder}
        autoSize
    />;
}
