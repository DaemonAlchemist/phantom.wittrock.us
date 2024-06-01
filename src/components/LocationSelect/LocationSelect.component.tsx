import { Tag } from "antd";
import {LocationSelectProps} from "./LocationSelect.d";
import styles from './LocationSelect.module.scss';
import { getLocation } from "../StoryGen/Storygen.helpers";
import { useStory } from "../../lib/storyGen/useStory";
import { useToggle } from "../../lib/useToggle";
import clsx from "clsx";

export const LocationSelectComponent = ({locationId, onChange}:LocationSelectProps) => {
    const {story} = useStory();
    const modal = useToggle();

    const updateLocation = (id:string) => () => {
        modal.off();
        onChange(id);
    }

    return <span className={styles.locationSelect}>
        <Tag onClick={modal.on}>{getLocation(story, locationId)}</Tag>
        <div className={clsx([styles.locationModal, modal.isOn && styles.open])}>
            {story.setting.locations.map(loc => <Tag onClick={updateLocation(loc.id)}>{loc.name}</Tag>)}
        </div>
    </span>;
}    
