import { AimOutlined, SendOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import { useState } from "react";
import { onInputChange } from "../../lib/onInputChange";
import { usePrompt } from "../../lib/usePrompt";
import { PromptButtonProps } from "./PromptButton.d";

export const PromptButtonComponent = ({systemPrompt, userPrompt, onUpdate, entityTypes, suffix, btnText, starter}:PromptButtonProps) => {
    const [instructions, setInstructions] = useState("");

    const prompt = usePrompt(systemPrompt, onUpdate, true);

    const onPrompt = () => {
        prompt.run(userPrompt, instructions, starter)();
    }

    return <Spin spinning={prompt.isRunning} tip={`Creating new ${entityTypes}`}>
        <Input.Search
            addonBefore={<AimOutlined />}
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
