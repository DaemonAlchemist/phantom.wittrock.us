import { SendOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { useState } from "react";
import { onInputChange } from "../../lib/onInputChange";
import { useStory } from "../../lib/storyGen/useStory";
import { finalPrompt, usePrompt } from "../../lib/usePrompt";
import { PromptEditor } from "../PromptEditor";
import { PromptButtonProps } from "./PromptButton.d";

export const PromptButtonComponent = ({
    promptId,
    onUpdate, entityTypes, suffix,
    btnText, starter, finishMsg,
    promptParams
}:PromptButtonProps) => {
    const [instructions, setInstructions] = useState("");

    const {story} = useStory();

    const prompt = usePrompt(
        finalPrompt(`${promptId}.system`, story, promptParams),
        onUpdate,
        true,
        finishMsg
    );

    const onPrompt = () => {
        prompt.run(
            finalPrompt(`${promptId}.user`, story, promptParams),
            instructions,
            starter
        )();
    }

    return <Spin spinning={prompt.isRunning} tip={`Creating new ${entityTypes}`}>
        <Input.Search
            addonBefore={<PromptEditor promptId={promptId} />}
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
