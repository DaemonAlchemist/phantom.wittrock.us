import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Row, Spin } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { IsFinished } from "../../IsFinished";
import { PartsDone } from "../../PartsDone";
import { Chapters } from "../Chapters";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { Summarizable } from "../Summarizable";
import { IAct } from "../story";
import { ActsProps } from "./Acts";
import styles from './Acts.module.scss';

export const ActsComponent = ({}:ActsProps) => {
    const {story, update} = useStory();

    const updateActs = (response:{acts: IAct[]}) => {
        update.act.set(response.acts);
    }

    const prompt = usePrompt(systemPrompts.acts(story.length), updateActs);

    return <Spin spinning={prompt.isRunning}>
        <div className={styles.acts}>
            <h2>
                Acts
                <Button type="primary" onClick={prompt.run(userPrompts.acts(story))}><SendOutlined /> Create acts</Button>
            </h2>
            <hr />
            <Collapse>
                {story.plot.acts.map((act, i) => <Collapse.Panel
                    className={styles.act}
                    header={<>
                        Act {i+1}: {act.title}
                        &nbsp;&nbsp;
                        <PartsDone entities={act.chapters || []} filter={c => !!c.summary} />
                        <IsFinished value={act.summary} />
                        <DeleteBtn onClick={update.act.remove(i)} entityType="act"/>
                    </>}
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
        </div>
    </Spin>;
}
