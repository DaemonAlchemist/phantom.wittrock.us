import { CarOutlined, KeyOutlined, SettingOutlined } from "@ant-design/icons";
import { Input, Popover, Select, Typography } from "antd";
import { onInputChange } from "../../lib/onInputChange";
import { needsApiKey, useApiKey, useEngine, useOllamaHost, useOllamaPort } from "../../lib/proxy";
import { ModelSelect } from "../ModelSelect";
import { EngineSelectProps } from "./EngineSelect.d";
import styles from './EngineSelect.module.scss';

export const EngineSelectComponent = ({}:EngineSelectProps) => {
    const [engine, setEngine, engineOptions] = useEngine();
    const [apiKey, setApiKey] = useApiKey(engine)();
    const [host, setHost] = useOllamaHost();
    const [port, setPort] = useOllamaPort();

    return <div className={styles.engineSelect}>
        <div className={styles.labeledSelect}>
            <span><CarOutlined /> Engine</span>
            <Select value={engine} onChange={setEngine} options={engineOptions.map(v => ({value: v, text: v}))} />
        </div>
        {needsApiKey(engine) && <Typography.Text type={!apiKey ? "danger" : "success"}>
            <Popover trigger="click" title={<div className={styles.keyPopover}>
                <Input addonBefore="API Key" value={apiKey} onChange={onInputChange(setApiKey)} />
            </div>}>
                <KeyOutlined />
            </Popover>
        </Typography.Text>}
        {engine === "Ollama" && <Typography.Text type="success">
            <Popover trigger="click" title={<div className={styles.hostPopover}>
                <Input className={styles.host} addonBefore="Ollama Server -  http://" value={host} onChange={onInputChange(setHost)} />
                <Input className={styles.port} addonBefore=":" value={port} onChange={onInputChange(setPort)} />
            </div>}>
                <SettingOutlined />
            </Popover>
        </Typography.Text>}
        &nbsp;&nbsp;
        <div className={styles.labeledSelect}>
            <ModelSelect />
        </div>
    </div>;
}
