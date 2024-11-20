import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import { emptyAct, useStory } from "@APP/lib/useStory";
import { EntityHeader } from "@ATP/components/EntityHeader";
import { Chapters } from "../Chapters";
import { Summarizable } from "@ATP/components/Summarizable";
import { IAct } from "../StoryGen/story";
import { ActsProps } from "./Acts";
import styles from './Acts.module.scss';
import { PromptButton } from "@APP/lib/customButtons";

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
            {(story.plot.acts || []).map((act:IAct, i:number) => <Collapse.Panel
                className={styles.act}
                header={<EntityHeader
                    type="Act"
                    index={i}
                    title={act.title}
                    subEntities={act.chapters}
                    subEntityFilter={c => !!c.summary}
                    isFinished={act.summary}
                    onDelete={update.act.remove(i)}
                    move={update.act.move}
                    onUpdateTitle={update.act.title(i)}
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
