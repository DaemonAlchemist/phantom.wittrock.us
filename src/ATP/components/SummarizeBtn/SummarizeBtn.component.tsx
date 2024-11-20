import { SendOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { prop } from "ts-functional";
import { usePrompt } from "@ATP/lib/usePrompt";
import { PromptEditor } from "../PromptEditor";
import { SummarizeBtnProps } from "./SummarizeBtn";
import styles from './SummarizeBtn.module.scss';

export const SummarizeBtnComponent = ({
    entities, field, promptId, onUpdate, entityName, params, compilePrompt
}:SummarizeBtnProps) => {
    const complete = entities.map(prop(field)).filter(value => !value).length === 0 && entities.length !== 0;

    const updateSummary = (response:{summary:string}) => {
        onUpdate(response.summary);
    }

    const systemPrompt = compilePrompt(`${promptId}.system`, params);
    const userPrompt = compilePrompt(`${promptId}.user`, params);

    const prompt = usePrompt(systemPrompt, updateSummary, true, `has finished summarizing your ${entityName}`);

    return <Spin spinning={prompt.isRunning} tip={`Summarizing ${entityName}`}>
        {complete && <div className={styles.summarizeBtn}>
            <Button className={styles.editorBtn}><PromptEditor promptId={promptId} /></Button>
            <Button className={styles.summaryBtn} type="primary" onClick={prompt.run(userPrompt)}>
                <SendOutlined /> Summarize {entityName}
            </Button>
        </div>}
    </Spin>;
}
