import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Row, Spin } from "antd";
import { prop } from "ts-functional";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { IsFinished } from "../../IsFinished";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
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

    const prompt = usePrompt(systemPrompts.beats(story.length), updateBeats);

    const beats = story.plot.acts[actIndex].chapters[chapterIndex].scenes[sceneIndex].beats || [];
    const sceneComplete = beats.map(prop("text")).filter(summary => !summary).length === 0;

    const updateSceneSummary = (response:{summary:string}) => {
        update.scene.summary(actIndex, chapterIndex, sceneIndex)(response.summary);
    }
    const summarizePrompt = usePrompt(systemPrompts.sceneSummary(story.length), updateSceneSummary);

    return <Spin spinning={prompt.isRunning || summarizePrompt.isRunning}>
        <div className={styles.beats}>
            <h2>
                Beats
                <Button type="primary" onClick={prompt.run(userPrompts.beats(story, actIndex, chapterIndex, sceneIndex))}><SendOutlined /> Create beats</Button>
            </h2>
            <hr />
            <Collapse>
                {beats.map((beat, i) => <Collapse.Panel
                    className={styles.beat}
                    header={<>
                        Beat {i+1}: {beat.title}
                        &nbsp;&nbsp;
                        <IsFinished value={beat.text} />
                        <DeleteBtn onClick={update.beat.remove(actIndex, chapterIndex, sceneIndex, i)} />
                    </>}
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
            {sceneComplete && <div className={styles.summarize}>
                <Button type="primary" onClick={summarizePrompt.run(userPrompts.summary.scene(story, actIndex, chapterIndex, sceneIndex))}>
                    <SendOutlined /> Summarize scene
                </Button>
            </div>}
        </div>
    </Spin>;
}
