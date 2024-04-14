import { Spin } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { Editable } from "../../Editable";
import { PromptButton } from "../../PromptButton";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { TextProps } from "./Text";
import styles from './Text.module.scss';

export const TextComponent = ({actIndex, chapterIndex, sceneIndex, beatIndex}:TextProps) => {
    const {story, update} = useStory();

    const updateText = (response:{text:string}) => {
        update.beat.text(actIndex, chapterIndex, sceneIndex, beatIndex)(response.text);
    }

    const prompt = usePrompt(systemPrompts.text(story.length), updateText);

    return <Spin spinning={prompt.isRunning}>
        <div className={styles.text}>
            <PromptButton
                systemPrompt={systemPrompts.text(story.length)}
                onUpdate={updateText}
                entityTypes="prose"
                userPrompt={userPrompts.text(story, actIndex, chapterIndex, sceneIndex, beatIndex)}
                btnText="Write!"
            />
            <Editable
                value={story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats[beatIndex].text}
                onChange={update.beat.text(actIndex, chapterIndex, sceneIndex, beatIndex)}
                placeholder="Beat text goes here."
                textArea
            />
        </div>
    </Spin>;
}
