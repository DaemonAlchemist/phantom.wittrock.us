import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import { emptyAct, useStory } from "../../../lib/storyGen/useStory";
import { DeleteBtn } from "../../DeleteBtn";
import { EntityHeader } from "../../EntityHeader";
import { IsFinished } from "../../IsFinished";
import { PartsDone } from "../../PartsDone";
import { PromptButton } from "../../PromptButton";
import { Chapters } from "../Chapters";
import { Summarizable } from "../Summarizable";
import { IAct } from "../story";
import { ActsProps } from "./Acts";
import styles from './Acts.module.scss';

export const ActsComponent = ({}:ActsProps) => {
    const {story, update} = useStory();

    const updateActs = (response:{acts: IAct[]}) => {
        update.act.set(response.acts);
    }

    return <div className={styles.acts}>
        <Row>
            <Col xs={4}><h2>Acts <PlusCircleOutlined onClick={update.act.add(emptyAct)} /></h2></Col>
            <Col xs={20}>
                <PromptButton
                    promptId="acts"
                    onUpdate={updateActs}
                    finishMsg="has finished creating acts for your story"
                    entityTypes="acts"
                    starter=""
                    promptParams={{}}
                />
            </Col>
        </Row>
        <hr />
        <Collapse>
            {(story.plot.acts || []).map((act, i) => <Collapse.Panel
                className={styles.act}
                header={<EntityHeader
                    type="Act"
                    index={i}
                    title={act.title}
                    subEntities={act.chapters}
                    subEntityFilter={c => !!c.summary}
                    isFinished={act.summary}
                    onDelete={update.act.remove(i)}
                />}
                key={i}
            >
                <Row>
                    <Col xs={4}>
                        <Summarizable entity={act} updateOutline={update.act.outline(i)} updateSummary={update.act.summary(i)}/>
                    </Col>
                    <Col xs={20}>
                        <Chapters actIndex={i} />
                    </Col>
                </Row>                    
            </Collapse.Panel>)}
        </Collapse>
    </div>;
}
