import { InfoOutlined, SendOutlined } from "@ant-design/icons";
import { Input, Modal, Spin, Tooltip } from "antd";
import { useState } from "react";
import { onInputChange } from "../../lib/onInputChange";
import { useStory } from "../../lib/storyGen/useStory";
import { useModal } from "../../lib/useModal";
import { finalPrompt, usePrompt } from "../../lib/usePrompt";
import { PromptEditor } from "../PromptEditor";
import { PromptButtonProps } from "./PromptButton.d";
import styles from "./PromptButton.module.scss";

export const PromptButtonComponent = ({
    promptId,
    onUpdate, entityTypes, suffix,
    btnText, starter, finishMsg,
    promptParams
}:PromptButtonProps) => {
    const [instructions, setInstructions] = useState("");
    const [lastPrompt, setLastPrompt] = useState("");

    const {story} = useStory();

    const systemPrompt = finalPrompt(`${promptId}.system`, story, promptParams);
    const prompt = usePrompt(systemPrompt, onUpdate, true, finishMsg);

    const onPrompt = () => {
        const userPrompt = finalPrompt(`${promptId}.user`, story, promptParams);
        setLastPrompt(userPrompt);
        prompt.run(userPrompt, instructions, starter)();
    }

    const modal = useModal();

    return <Spin spinning={prompt.isRunning} tip={`Creating new ${entityTypes}`}>
        <Modal className={styles.lastPromptModal} open={modal.isOpen} onCancel={modal.close} footer={null}>
            <h2>What just ran?</h2>
            <hr/>

            <label><b>System Prompt</b></label>
            <pre>{systemPrompt}</pre>

            <label><b>User Prompt</b></label>
            <pre>{lastPrompt}</pre>
        </Modal>
        <Input.Search
            addonBefore={<PromptEditor promptId={promptId} />}
            suffix={<>
                {suffix}
                {!!lastPrompt && <Tooltip title="What prompt was just run?"><InfoOutlined onClick={modal.open}/></Tooltip>}
            </>}
            value={instructions}
            onChange={onInputChange(setInstructions)}
            onSearch={onPrompt}
            placeholder={`Extra instructions for new ${entityTypes}`}
            enterButton={<>
                <SendOutlined /> {btnText || `Create new ${entityTypes}`}
            </>}
        />
    </Spin>;
}
