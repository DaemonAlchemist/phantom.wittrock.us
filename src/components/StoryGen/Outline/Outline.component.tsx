import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Spin } from "antd";
import { onInputChange } from "../../../lib/onInputChange";
import { usePrompt } from "../../../lib/usePrompt";
import { systemPrompts, useIdea, useOutline } from "../Storygen.helpers";
import { OutlineProps } from "./Outline";

export const OutlineComponent = ({}:OutlineProps) => {
    const [idea, setIdea] = useIdea();

    const [outline, setOutline] = useOutline();
    const prompt = usePrompt(systemPrompts.outline, setOutline);
        
    return <div>
        <Spin spinning={prompt.isRunning}>
            <p>Enter your story idea here, and then generate a detailed outline.</p>
            <Input.TextArea value={idea} onChange={onInputChange(setIdea)} />
            <Button onClick={prompt.run(idea)} type="primary">
                <SendOutlined /> Generate story outline
            </Button>
            <p>{outline}</p>
        </Spin>
    </div>;
}
