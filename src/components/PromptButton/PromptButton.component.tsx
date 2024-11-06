import { SendOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { useState } from "react";
import { onInputChange } from "../../lib/onInputChange";
import { useStory } from "../../lib/storyGen/useStory";
import { compilePrompt, usePrompt } from "../../lib/usePrompt";
import { PromptEditor } from "../PromptEditor";
import { PromptInfoModal } from "../PromptInfoModal";
import { PromptButtonProps } from "./PromptButton.d";

export const PromptButtonComponent = ({
    promptId,
    onUpdate, entityTypes, suffix,
    btnText, starter, finishMsg,
    promptParams
}:PromptButtonProps) => {
    const [instructions, setInstructions] = useState("");
    const [lastPrompt, setLastPrompt] = useState("");

    const {story} = useStory();

    const systemPrompt = compilePrompt(`${promptId}.system`, story, promptParams);
    const prompt = usePrompt(systemPrompt, onUpdate, true, finishMsg);

    const onPrompt = () => {
        const userPrompt = compilePrompt(`${promptId}.user`, story, promptParams);
        setLastPrompt(userPrompt);
        prompt.run(userPrompt, instructions, starter)();
    }

    return <Spin spinning={prompt.isRunning} tip={`Creating new ${entityTypes}`}>
        <Input.Search
            addonBefore={<PromptEditor promptId={promptId} />}
            suffix={<>
                {suffix}
                <PromptInfoModal lastPrompt={lastPrompt} systemPrompt={systemPrompt} />
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
