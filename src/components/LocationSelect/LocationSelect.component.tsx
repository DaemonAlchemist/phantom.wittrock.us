import { Select } from "antd";
import { useStory } from "../../lib/storyGen/useStory";
import { LocationSelectProps } from "./LocationSelect.d";
import styles from './LocationSelect.module.scss';

export const LocationSelectComponent = ({locationId, onChange}:LocationSelectProps) => {
    const {story} = useStory();

    return <span className={styles.locationSelect}>
        <Select value={locationId} popupMatchSelectWidth={false} onChange={onChange}>
            {story.setting.locations.map(location => <Select.Option key={location.id} value={location.id}>
                {location.name}
            </Select.Option>)}
        </Select>
    </span>;
}    
