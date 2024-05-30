import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { emptyLocation, useStory } from "../../../lib/storyGen/useStory";
import { DeleteBtn } from "../../DeleteBtn";
import { Editable } from "../../Editable";
import { PromptButton } from "../../PromptButton";
import { ISetting } from "../story";
import { LocationsProps } from "./Locations";
import styles from './Locations.module.scss';

export const LocationsComponent = ({}:LocationsProps) => {
    const {story, update} = useStory();

    const updateLocations = (setting:ISetting) => {
        console.log(setting);
        setting.locations.forEach(location => {update.location.add(location)()});
    }

    return <div className={styles.locations}>
        <Row>
            <Col xs={4}><h2>Locations <PlusCircleOutlined onClick={update.location.add(emptyLocation)}/></h2></Col>
            <Col xs={20}>
                <PromptButton
                    promptId="locations"
                    entityTypes="locations"
                    onUpdate={updateLocations}
                    finishMsg="has finished creating locations"
                    promptParams={{}}
                />
            </Col>
        </Row>
        <hr />
        <ul className={styles.locationList}>
            {story.setting.locations.map((location, i) => <li key={i}>
                <h2 className={styles.name}>
                    <Editable value={location.name} onChange={update.location.name(i)} placeholder="Location name here"/>
                    <DeleteBtn onClick={update.location.remove(i)} entityType="location"/>
                </h2>
                <div className={styles.description}>
                    <Editable value={location.description} onChange={update.location.description(i)} textArea placeholder="Location description here"/>
                </div>
                <div className={styles.id}>
                    <Editable value={location.id} onChange={update.location.id(i)} placeholder="idGoesHere" />
                </div>
            </li>)}
        </ul>
    </div>;
}
