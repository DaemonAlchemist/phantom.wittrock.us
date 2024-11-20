import { PromptButton } from "@APP/lib/customButtons";
import { useStory } from "@APP/lib/useStory";
import { Editable } from "@ATP/components/Editable";
import { TextProps } from "./Text";
import styles from './Text.module.scss';

export const TextComponent = ({actIndex, chapterIndex, sceneIndex, beatIndex}:TextProps) => {
    const {story, update} = useStory();

    const updateText = (response:{text:string}) => {
        update.beat.text(actIndex, chapterIndex, sceneIndex, beatIndex)(response.text);
    }

    return <div className={styles.text}>
        <PromptButton
            promptId="prose"
            onUpdate={updateText}
            finishMsg="has finished writing prose for your beat"
            entityTypes="prose"
            btnText="Write!"
            promptParams={{actIndex, chapterIndex, sceneIndex, beatIndex}}
        />
        <Editable
            value={story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats[beatIndex].text}
            onChange={update.beat.text(actIndex, chapterIndex, sceneIndex, beatIndex)}
            placeholder="Beat text goes here."
            textArea
        />
    </div>;
}
