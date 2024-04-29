import { InfoOutlined, SendOutlined } from "@ant-design/icons";
import { Input, Modal, Spin } from "antd";
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

    const prompt = usePrompt(
        finalPrompt(`${promptId}.system`, story, promptParams),
        onUpdate,
        true,
        finishMsg
    );

    const onPrompt = () => {
        const userPrompt = finalPrompt(`${promptId}.user`, story, promptParams);
        setLastPrompt(userPrompt);
        prompt.run(userPrompt, instructions, starter)();
    }

    const modal = useModal();

    return <Spin spinning={prompt.isRunning} tip={`Creating new ${entityTypes}`}>
        <Modal className={styles.lastPromptModal} open={modal.isOpen} onCancel={modal.close} footer={null}>
            <pre>{lastPrompt}</pre>
        </Modal>
        <Input.Search
            addonBefore={<PromptEditor promptId={promptId} />}
            suffix={<>
                {suffix}
                {!!lastPrompt && <InfoOutlined onClick={modal.open}/>}
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
