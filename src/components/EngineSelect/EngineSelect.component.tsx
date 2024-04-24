import { CarOutlined, KeyOutlined } from "@ant-design/icons";
import { Input, Popover, Select, Typography } from "antd";
import { onInputChange } from "../../lib/onInputChange";
import { needsApiKey, useApiKey, useEngine } from "../../lib/proxy";
import { ModelSelect } from "../ModelSelect";
import { EngineSelectProps } from "./EngineSelect.d";
import styles from './EngineSelect.module.scss';

export const EngineSelectComponent = ({}:EngineSelectProps) => {
    const [engine, setEngine, engineOptions] = useEngine();
    const [apiKey, setApiKey] = useApiKey(engine)();

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
        {!needsApiKey(engine) && <Typography.Text type="secondary"><KeyOutlined /></Typography.Text>}
        &nbsp;&nbsp;
        <div className={styles.labeledSelect}>
            <ModelSelect />
        </div>
    </div>;
}
