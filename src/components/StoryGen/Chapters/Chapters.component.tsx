import { PlusCircleOutlined } from "@ant-design/icons";
import { Col, Collapse, Row } from "antd";
import { emptyChapter, useStory } from "../../../lib/storyGen/useStory";
import { EntityHeader } from "../../EntityHeader";
import { PromptButton } from "../../PromptButton";
import { SummarizeBtn } from "../../SummarizeBtn";
import { Scenes } from "../Scenes";
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

    const chapters = story.plot.acts[actIndex].chapters || [];

    return<div className={styles.chapters}>
        <Row>
            <Col xs={4}><h2>Chapters <PlusCircleOutlined onClick={update.chapter.add(actIndex, emptyChapter)}/></h2></Col>
            <Col xs={20}>
                <PromptButton
                    promptId="chapters"
                    onUpdate={updateChapters}
                    finishMsg="has finished creating chapters for your act"
                    entityTypes="chapters"
                    promptParams={{actIndex}}
                />
            </Col>
        </Row>
        <hr />
        <Collapse>
            {chapters.map((chapter, i) => <Collapse.Panel
                className={styles.chapter}
                header={<EntityHeader
                    type="Chapter"
                    index={i}
                    title={chapter.title}
                    subEntities={chapter.scenes}
                    subEntityFilter={s => !!s.summary}
                    isFinished={chapter.summary}
                    onDelete={update.chapter.remove(actIndex, i)}
                />}
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
            promptId="act.summary"
            params={{actIndex}}
            onUpdate={update.act.summary(actIndex)}
        />
    </div>;
}
