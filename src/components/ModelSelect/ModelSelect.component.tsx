import { Select, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import request from "superagent";
import { partition, prop } from "ts-functional";
import { Index } from "ts-functional/dist/types";
import { IOpenRouterModel } from "../../lib/proxy";
import { ModelSelectProps } from "./ModelSelect.d";
import styles from './ModelSelect.module.scss';
import { useModelId } from "./ModelSelect.helpers";
import { SlidersOutlined, StopOutlined } from "@ant-design/icons";

export const ModelSelectComponent = ({label}:ModelSelectProps) => {
    const [modelId, setModelId] = useModelId();
    const [models, setModels] = useState<Index<IOpenRouterModel[]>>({});

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        request.get("https://openrouter.ai/api/v1/models")
            .then(prop("body"))
            .then(prop("data"))
            .then(models => {
                setModels(partition<IOpenRouterModel>(
                    m => m.id.split("/")[0],
                )(models));
                setLoading(false);
            });
    }, []);
    return <Spin spinning={loading}><div className={styles.modelSelect}>
        <span><SlidersOutlined /> {label || "Model"}</span>
        <Select value={modelId} onChange={setModelId} showSearch>
            <Select.Option value=""><StopOutlined /> No model selected</Select.Option>
            {Object.keys(models).map(provider => <Select.OptGroup label={provider}>
                {models[provider].map(model => <Select.Option value={model.id}>
                    {model.name}&nbsp;
                    <Typography.Text type="success">{+model.pricing.completion > 0 
                        ? <>${((+model.pricing.prompt)*1000000).toFixed(2)} / ${((+model.pricing.completion)*1000000).toFixed(2)}</>
                        : <>FREE</>
                    }</Typography.Text>
                </Select.Option>)}
            </Select.OptGroup>)}
        </Select>
    </div></Spin>;
}
