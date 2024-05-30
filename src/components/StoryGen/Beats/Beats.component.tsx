import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import { emptyBeat, useStory } from "../../../lib/storyGen/useStory";
import { EntityHeader } from "../../EntityHeader";
import { PromptButton } from "../../PromptButton";
import { SummarizeBtn } from "../../SummarizeBtn";
import { Summarizable } from "../Summarizable";
import { Text } from "../Text";
import { IBeat } from "../story";
import { BeatsProps } from "./Beats";
import styles from './Beats.module.scss';

export const BeatsComponent = ({actIndex, chapterIndex, sceneIndex}:BeatsProps) => {
    const {story, update} = useStory();

    const updateBeats = (response:{beats: IBeat[]}) => {
        response.beats.forEach(beat => {update.beat.add(actIndex, chapterIndex, sceneIndex, beat)()});
    }

    const beats = story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats || [];

    return <div className={styles.beats}>
        <Row>
            <Col xs={4}><h2>Beats <PlusCircleOutlined onClick={update.beat.add(actIndex, chapterIndex, sceneIndex, emptyBeat)}/></h2></Col>
            <Col xs={20}>
                <PromptButton
                    promptId="beats"
                    onUpdate={updateBeats}
                    finishMsg="has finished creating beats for your scene"
                    entityTypes="beats"
                    promptParams={{actIndex, chapterIndex, sceneIndex}}
                />
            </Col>
        </Row>
        <hr />
        <Collapse>
            {beats.map((beat, i) => <Collapse.Panel
                className={styles.beat}
                header={<EntityHeader
                    type="Beat"
                    index={i}
                    title={beat.title}
                    isFinished={beat.text}
                    onDelete={update.beat.remove(actIndex, chapterIndex, sceneIndex, i)}
                />}
                key={i}
            >
                <Row>
                    <Col xs={6}>
                        <Summarizable
                            entity={beat}
                            updateOutline={update.beat.outline(actIndex, chapterIndex, sceneIndex, i)}
                            updateSummary={update.beat.summary(actIndex, chapterIndex, sceneIndex, i)}
                            hideSummary
                        />
                    </Col>
                    <Col xs={18}>
                        <Text actIndex={actIndex} chapterIndex={chapterIndex} sceneIndex={sceneIndex} beatIndex={i} />
                    </Col>
                </Row>                    
            </Collapse.Panel>)}
        </Collapse>
        <SummarizeBtn
            entities={beats}
            field="text"
            entityName="scene"
            promptId="scene.summary"
            params={{actIndex, chapterIndex, sceneIndex}}
            onUpdate={update.scene.summary(actIndex, chapterIndex, sceneIndex)}
        />
    </div>;
}
