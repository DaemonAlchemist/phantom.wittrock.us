import { SendOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Row, Spin, Tag } from "antd";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { Scenes } from "../Scenes";
import { systemPrompts, userPrompts } from "../Storygen.helpers";
import { Summarizable } from "../Summarizable";
import { IChapter } from "../story";
import { ChaptersProps } from "./Chapters";
import styles from './Chapters.module.scss';

export const ChaptersComponent = ({actIndex}:ChaptersProps) => {
    const {story, update} = useStory();

    const updateChapters = (response:{chapters: IChapter[]}) => {
        response.chapters.forEach(chapter => {update.chapter.add(actIndex, {
            ...chapter,
            scenes: []
        })()});
    }

    const prompt = usePrompt(systemPrompts.chapters, updateChapters);

    const finishedScenes = (i:number) => (story.plot.acts[actIndex].chapters[i].scenes || []).filter(s => !!s.summary).length;
    const totalScenes = (i:number) => (story.plot.acts[actIndex].chapters[i].scenes || []).length;

    return <Spin spinning={prompt.isRunning}>
        <div className={styles.chapters}>
            <h2>
                Chapters
                <Button type="primary" onClick={prompt.run(userPrompts.chapters(story, actIndex))}><SendOutlined /> Create chapters</Button>
            </h2>
            <hr />
            <Collapse>
                {(story.plot.acts[actIndex].chapters || []).map((chapter, i) => <Collapse.Panel
                    className={styles.chapter}
                    header={<>
                        Chapter {i+1}: {chapter.title}
                        &nbsp;&nbsp;
                        <Tag color={finishedScenes(i) === 0 ? "red" : finishedScenes(i) < totalScenes(i) ? "gold" : "green"}>
                            {finishedScenes(i)}/{totalScenes(i)}
                        </Tag>
                        <DeleteBtn onClick={update.chapter.remove(actIndex, i)} />
                    </>}
                    key={i}
                >
                    <Row>
                        <Col xs={6}>
                            <Summarizable entity={chapter} updateOutline={update.chapter.outline(actIndex, i)} updateSummary={update.chapter.summary(actIndex, i)}/>
                        </Col>
                        <Col xs={18}>
                            <Scenes actIndex={actIndex} chapterIndex={i}/>
                        </Col>
                    </Row>                    
                </Collapse.Panel>)}
            </Collapse>
        </div>
    </Spin>;
}
