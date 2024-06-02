import { Select } from "antd";
import { useStory } from "../../lib/storyGen/useStory";
import {CharacterSelectProps} from "./CharacterSelect.d";
import styles from './CharacterSelect.module.scss';

export const CharacterSelectComponent = ({characterIds, onChange}:CharacterSelectProps) => {
    const {story} = useStory();
    
    return <span className={styles.characterSelect}>
        <Select value={characterIds} mode="tags" onChange={onChange}>
            {story.characters.map(char => <Select.Option value={char.id}>
                {char.name}
            </Select.Option>)}
        </Select>
    </span>;
}
