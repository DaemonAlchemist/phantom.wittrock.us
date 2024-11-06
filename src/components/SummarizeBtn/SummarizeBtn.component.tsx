import { prop } from "ts-functional";
import {SummarizeBtnProps} from "./SummarizeBtn.d";
import styles from './SummarizeBtn.module.scss';
import { Button, Spin } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { compilePrompt, usePrompt } from "../../lib/usePrompt";
import { useStory } from "../../lib/storyGen/useStory";
import { PromptEditor } from "../PromptEditor";

export const SummarizeBtnComponent = ({entities, field, promptId, onUpdate, entityName, params}:SummarizeBtnProps) => {
    const complete = entities.map(prop(field)).filter(value => !value).length === 0 && entities.length !== 0;

    const updateSummary = (response:{summary:string}) => {
        onUpdate(response.summary);
    }

    const {story} = useStory();

    const systemPrompt = compilePrompt(`${promptId}.system`, story, {});
    const userPrompt = compilePrompt(`${promptId}.user`, story, params);

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
