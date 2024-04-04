import { PlusCircleOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { Editable } from "../../Editable";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { ISetting } from "../story";
import { LocationsProps } from "./Locations";
import styles from './Locations.module.scss';

export const LocationsComponent = ({}:LocationsProps) => {
    const {story, update} = useStory();

    const updateLocations = (setting:ISetting) => {
        console.log(setting);
        setting.locations.forEach(location => {update.location.add(location)()});
    }

    const prompt = usePrompt(systemPrompts.locations(story.length), updateLocations);

    return <Spin spinning={prompt.isRunning}>
        <div className={styles.locations}>
            <h2>
                Locations&nbsp;
                <PlusCircleOutlined onClick={update.location.add({id: "", name: "", description: ""})}/>
                <Button type="primary" onClick={prompt.run(userPrompts.locations(story))}><SendOutlined /> Generate new locations</Button>
            </h2>
            <hr />
            <ul className={styles.locationList}>
                {story.setting.locations.map((location, i) => <li key={i}>
                    <h2 className={styles.name}>
                        <Editable value={location.name} onChange={update.location.name(i)} placeholder="Location name here"/>
                        <DeleteBtn onClick={update.location.remove(i)} />
                    </h2>
                    <div className={styles.description}>
                        <Editable value={location.description} onChange={update.location.description(i)} textArea placeholder="Location description here"/>
                    </div>
                    <div className={styles.id}>
                        <Editable value={location.id} onChange={update.location.id(i)} placeholder="idGoesHere" />
                    </div>
                </li>)}
            </ul>
        </div>
    </Spin>;
}
