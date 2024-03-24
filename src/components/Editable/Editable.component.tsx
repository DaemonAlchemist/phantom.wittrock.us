import { Input } from "antd";
import { onInputChange } from "../../lib/onInputChange";
import { EditableProps } from "./Editable.d";
import styles from './Editable.module.scss';

export const EditableComponent = ({value, onChange, placeholder, textArea}:EditableProps) => { 
    const Component = textArea ? Input.TextArea : Input;
    return <Component
        value={value}
        className={styles.editable}
        onChange={onInputChange(onChange)}
        placeholder={placeholder}
        autoSize
    />;
}
