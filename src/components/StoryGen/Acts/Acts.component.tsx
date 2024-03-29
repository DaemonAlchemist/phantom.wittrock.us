import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Row, Spin, Tag } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { Chapters } from "../Chapters";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { Summarizable } from "../Summarizable";
import { IAct } from "../story";
import { ActsProps } from "./Acts";
import styles from './Acts.module.scss';

export const ActsComponent = ({}:ActsProps) => {
    const {story, update} = useStory();

    const updateActs = (response:{acts: IAct[]}) => {
        response.acts.forEach(act => {update.act.add({
            ...act,
            chapters: [],
        })()});
    }

    const prompt = usePrompt(systemPrompts.acts, updateActs);
    const finishedChapters = (i:number) => (story.plot.acts[i].chapters || []).filter(c => !!c.summary).length;
    const totalChapters = (i:number) => (story.plot.acts[i].chapters || []).length;

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
                        <Tag color={finishedChapters(i) === 0 ? "red" : finishedChapters(i) < totalChapters(i) ? "gold" : "green"}>
                            {finishedChapters(i)}/{totalChapters(i)}
                        </Tag>
                        <DeleteBtn onClick={update.act.remove(i)} />
                    </>}
                    key={i}
                >
                    <Row>
                        <Col xs={6}>
                            <Summarizable entity={act} updateOutline={update.act.outline(i)} updateSummary={update.act.summary(i)}/>
                        </Col>
                        <Col xs={18}>
                            <Chapters actIndex={i} />
                        </Col>
                    </Row>                    
                </Collapse.Panel>)}
            </Collapse>
        </div>
    </Spin>;
}
