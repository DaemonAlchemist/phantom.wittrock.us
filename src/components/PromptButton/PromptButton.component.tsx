import { SendOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { useState } from "react";
import { onInputChange } from "../../lib/onInputChange";
import { usePrompt } from "../../lib/usePrompt";
import { PromptButtonProps } from "./PromptButton.d";

export const PromptButtonComponent = ({systemPrompt, userPrompt, onUpdate, entityTypes, suffix}:PromptButtonProps) => {
    const [instructions, setInstructions] = useState("");

    const prompt = usePrompt(systemPrompt, onUpdate, true);

    const onPrompt = () => {
        prompt.run(userPrompt, instructions)();
    }

    return <Spin spinning={prompt.isRunning} tip={`Creating new ${entityTypes}`}>
        <Input.Search
            addonBefore="Extra instructions"
            suffix={suffix}
            value={instructions}
            onChange={onInputChange(setInstructions)}
            onSearch={onPrompt}
            placeholder={`Provide some extra instructions to guide the creation of new ${entityTypes}`}
            enterButton={<>
                <SendOutlined /> Create new {entityTypes}
            </>}
        />
    </Spin>;
}
