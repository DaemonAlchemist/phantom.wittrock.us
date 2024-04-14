import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Row, Spin } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { IsFinished } from "../../IsFinished";
import { PartsDone } from "../../PartsDone";
import { Scenes } from "../Scenes";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { Summarizable } from "../Summarizable";
import { IChapter } from "../story";
import { ChaptersProps } from "./Chapters";
import styles from './Chapters.module.scss';
import { SummarizeBtn } from "../../SummarizeBtn";

export const ChaptersComponent = ({actIndex}:ChaptersProps) => {
    const {story, update} = useStory();

    const updateChapters = (response:{chapters: IChapter[]}) => {
        response.chapters.forEach(chapter => {update.chapter.add(actIndex, {
            ...chapter,
            scenes: []
        })()});
    }

    const chapters = story.plot.acts[actIndex].chapters || [];

    const prompt = usePrompt(systemPrompts.chapters(story.length), updateChapters);

    return <Spin spinning={prompt.isRunning}>
        <div className={styles.chapters}>
            <h2>
                Chapters
                <Button type="primary" onClick={prompt.run(userPrompts.chapters(story, actIndex))}><SendOutlined /> Create chapters</Button>
            </h2>
            <hr />
            <Collapse>
                {chapters.map((chapter, i) => <Collapse.Panel
                    className={styles.chapter}
                    header={<>
                        Chapter {i+1}: {chapter.title}
                        &nbsp;&nbsp;
                        <PartsDone entities={chapter.scenes || []} filter={s => !!s.summary} />
                        <IsFinished value={chapter.summary} />
                        <DeleteBtn onClick={update.chapter.remove(actIndex, i)} entityType="chapter"/>
                    </>}
                    key={i}
                >
                    <Row>
                        <Col xs={4}>
                            <Summarizable entity={chapter} updateOutline={update.chapter.outline(actIndex, i)} updateSummary={update.chapter.summary(actIndex, i)}/>
                        </Col>
                        <Col xs={20}>
                            <Scenes actIndex={actIndex} chapterIndex={i}/>
                        </Col>
                    </Row>                    
                </Collapse.Panel>)}
            </Collapse>
            <SummarizeBtn
                entities={chapters}
                field="summary"
                entityName="act"
                systemPrompt={systemPrompts.actSummary(story.length)}
                userPrompt={userPrompts.summary.act(story, actIndex)}
                onUpdate={update.act.summary(actIndex)}
            />
        </div>
    </Spin>;
}
