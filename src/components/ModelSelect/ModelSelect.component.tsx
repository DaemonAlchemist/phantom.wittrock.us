import { SlidersOutlined, StopOutlined } from "@ant-design/icons";
import { Select, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { Func, Index } from "ts-functional/dist/types";
import { IOllamaModel, IOpenRouterModel, availableModels } from "../../config";
import { useEngine, useModel } from "../../lib/proxy";
import { ModelSelectProps } from "./ModelSelect.d";
import styles from './ModelSelect.module.scss';

export const ModelSelectComponent = ({label}:ModelSelectProps) => {
    const [modelId, setModelId] = useModel();
    const [models, setModels] = useState<Index<IOpenRouterModel[] | IOllamaModel[]>>({});
    const [engine] = useEngine();

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        availableModels[engine]().then(models => {
            setModels(models);
            setLoading(false);
        });
    });

    const ModelName:Index<Func<{model:IOpenRouterModel}, JSX.Element> | Func<{model:IOllamaModel}, JSX.Element>> = {
        Ollama: ({model}:{model:IOllamaModel}):JSX.Element => !!model.details 
            ? <>
                {model.name}&nbsp;
                <Typography.Text type="success">{model.details.parameter_size}</Typography.Text>
            </>
            : <></>,
        OpenRouter: ({model}:{model:IOpenRouterModel}) => !!model.pricing
            ? <>
                {model.name}&nbsp;
                <Typography.Text type="success">{+model.pricing.completion > 0 
                    ? <>${((+model.pricing.prompt || 0)*1000000).toFixed(2)} / ${((+model.pricing.completion || 0)*1000000).toFixed(2)}</>
                    : <>FREE</>
                }</Typography.Text>
            </>
            : <></>,
    }

    const Name = ModelName[engine];

    return <Spin spinning={loading}><div className={styles.modelSelect}>
        <span><SlidersOutlined /> {label || "Model"}</span>
        <Select<string> value={modelId} onChange={setModelId} showSearch>
            <Select.Option value={""}><StopOutlined /> No model selected</Select.Option>
            {Object.keys(models).map((provider, i) => <Select.OptGroup key={i} label={provider}>
                {models[provider].map(model => <Select.Option key={model.id} value={model.id}>
                    <Name model={model as any} />
                </Select.Option>)}
            </Select.OptGroup>)}
        </Select>
    </div></Spin>;
}
