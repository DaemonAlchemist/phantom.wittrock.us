import { Input, Select } from "antd";
import { needsApiKey, useApiKey, useEngine, useModel } from "../../lib/proxy";
import { EngineSelectProps } from "./EngineSelect.d";
import styles from './EngineSelect.module.scss';
import { CarOutlined, SlidersOutlined } from "@ant-design/icons";
import { onInputChange } from "../../lib/onInputChange";

export const EngineSelectComponent = ({}:EngineSelectProps) => {
    const [engine, setEngine, engineOptions] = useEngine();
    const [model, setModel, modelOptions] = useModel();
    const [apiKey, setApiKey] = useApiKey(engine)();

    return <div className={styles.engineSelect}>
        <div className={styles.labeledSelect}>
            <span><CarOutlined /> Engine</span>
            <Select value={engine} onChange={setEngine} options={engineOptions.map(v => ({value: v, text: v}))} />
        </div>
        <div className={styles.labeledSelect}>
            <span><SlidersOutlined /> Model</span>
            <Select value={model} onChange={setModel} options={modelOptions.map(v => ({value: v, text: v}))} />
        </div>
        {needsApiKey(engine) && <Input addonBefore="API Key" value={apiKey} onChange={onInputChange(setApiKey)} />}
    </div>;
}
