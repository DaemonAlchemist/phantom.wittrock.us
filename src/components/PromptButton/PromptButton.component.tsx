import { SendOutlined, SettingOutlined } from "@ant-design/icons";
import { Input, Modal, Spin } from "antd";
import { useState } from "react";
import { onInputChange } from "../../lib/onInputChange";
import { finalPrompt, usePrompt, usePrompts } from "../../lib/usePrompt";
import { PromptButtonProps } from "./PromptButton.d";
import { useModal } from "../../lib/useModal";
import { useStory } from "../../lib/storyGen/useStory";

export const PromptButtonComponent = ({
    systemPrompt, promptId, userPrompt,
    onUpdate, entityTypes, suffix,
    btnText, starter, finishMsg,
    promptParams
}:PromptButtonProps) => {
    const [instructions, setInstructions] = useState("");
    const {prompts, update} = usePrompts(promptId);

    const {story} = useStory();

    const prompt = usePrompt(
        promptId ? finalPrompt(`${promptId}.system`, story, promptParams) : (systemPrompt || ""),
        onUpdate,
        true,
        finishMsg
    );

    const onPrompt = () => {
        prompt.run(
            promptId ? finalPrompt(`${promptId}.user`, story, promptParams) : (userPrompt || ""),
            instructions,
            starter
        )();
    }

    const modal = useModal();

    return <Spin spinning={prompt.isRunning} tip={`Creating new ${entityTypes}`}>
        <Input.Search
            addonBefore={!!promptId ? <>
                <SettingOutlined onClick={modal.open} />
                <Modal title="Edit Prompts" open={modal.isOpen} onCancel={modal.close} footer={null}>
                    <label>System</label>
                    <Input.TextArea value={prompts.system} onChange={onInputChange(update.system)} autoSize />

                    <label>User</label>
                    <Input.TextArea value={prompts.user} onChange={onInputChange(update.user)} autoSize />
                </Modal>
            </> : undefined}
            suffix={suffix}
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
