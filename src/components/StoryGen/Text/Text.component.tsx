import { SendOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { usePrompt } from "../../../lib/usePrompt";
import { Editable } from "../../Editable";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { TextProps } from "./Text";
import styles from './Text.module.scss';
import { useStory } from "../../../lib/storyGen/useStory";

export const TextComponent = ({actIndex, chapterIndex, sceneIndex, beatIndex}:TextProps) => {
    const {story, update} = useStory();

    const updateText = (response:{text:string}) => {
        update.beat.text(actIndex, chapterIndex, sceneIndex, beatIndex)(response.text);
    }

    const prompt = usePrompt(systemPrompts.text(story.length), updateText);

    return <Spin spinning={prompt.isRunning}>
        <div className={styles.text}>
            <Button type="primary" onClick={prompt.run(userPrompts.text(story, actIndex, chapterIndex, sceneIndex, beatIndex))}><SendOutlined /> Write!</Button>
            <Editable
                value={story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats[beatIndex].text}
                onChange={update.beat.text(actIndex, chapterIndex, sceneIndex, beatIndex)}
                placeholder="Beat text goes here."
                textArea
            />
        </div>
    </Spin>;
}
