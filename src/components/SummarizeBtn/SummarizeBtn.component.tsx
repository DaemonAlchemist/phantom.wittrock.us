import { prop } from "ts-functional";
import {SummarizeBtnProps} from "./SummarizeBtn.d";
import styles from './SummarizeBtn.module.scss';
import { Button, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { usePrompt } from "../../lib/usePrompt";

export const SummarizeBtnComponent = ({entities, field, systemPrompt, userPrompt, onUpdate, entityName}:SummarizeBtnProps) => {
    const complete = entities.map(prop(field)).filter(value => !value).length === 0;

    const updateSummary = (response:{summary:string}) => {
        onUpdate(response.summary);
    }

    const prompt = usePrompt(systemPrompt, updateSummary);

    return <Spin spinning={prompt.isRunning} tip={`Summarizing ${entityName}`}>
        {complete && <div className={styles.summarizeBtn}>
            <Button type="primary" onClick={prompt.run(userPrompt)}>
                <SendOutlined /> Summarize {entityName}
            </Button>
        </div>}
    </Spin>;
}
