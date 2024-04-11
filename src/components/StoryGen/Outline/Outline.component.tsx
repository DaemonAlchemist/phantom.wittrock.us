import { PlusCircleOutlined, SendOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Input, Row, Spin } from "antd";
import { onInputChange } from "../../../lib/onInputChange";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { DeleteBtn } from "../../DeleteBtn";
import { Editable } from "../../Editable";
import { systemPrompts, useIdea } from "../Storygen.helpers";
import { IStoryOutline } from "../story";
import { OutlineProps } from "./Outline";
import styles from "./Outline.module.scss";

export const OutlineComponent = ({}:OutlineProps) => {
    const [idea, setIdea] = useIdea();
    const {story, update} = useStory();

    const updateStory = (details:IStoryOutline) => {
        update.story(old => ({
            ...old,
            title: details.title,
            genre: details.genre,
            themes: details.themes,
            audience: details.audience,
            length: details.length,
            ending: details.ending,
            setting: {
                ...old.setting,
                timePeriod: details.setting?.timePeriod,
            },
            plot: {
                ...old.plot,
                outline: details.plot.outline,
            }
        }));
    }

    const prompt = usePrompt(systemPrompts.outline(story.length), updateStory);
        
    return <div>
        <h2>Story Overview</h2>
        <hr />
        <Spin spinning={prompt.isRunning}>
            <Row gutter={64}>
                <Col xs={6} className={styles.outlinePrompt}>
                    <Alert type="info" message="Enter your story idea here.  It can be as simple or as detailed as you want it to be." />
                    <Input.TextArea
                        value={idea}
                        onChange={onInputChange(setIdea)}
                        autoSize
                    />
                    <Button onClick={prompt.run(idea)} type="primary" size="large">
                        <SendOutlined /> Create your story
                    </Button>
                </Col>
                <Col xs={12}>
                    <div className={styles.basic}>
                        <div className={styles.title}><Editable value={story.title} onChange={update.title} placeholder="Title Goes Here." /></div>
                        <div className={styles.genre}><Editable value={story.genre} onChange={update.genre} placeholder="Genre goes here." /></div>
                        <div className={styles.timePeriod}><Editable value={story.setting.timePeriod} onChange={update.timePeriod} placeholder="Time period goes here." /></div>
                        <div className={styles.audience}><Editable value={story.audience} onChange={update.audience} placeholder="Audience goes here" /></div>
                        <div className={styles.length}><Editable value={story.length} onChange={update.length} placeholder="Length goes here." /></div>
                    </div>

                    <h2>Story Outline</h2>
                    <p className={styles.plotOutline}>
                        <Editable value={story.plot.outline} onChange={update.plot.outline} placeholder="Story outline goes here." textArea/>
                    </p>

                    <h2>Ending</h2>
                    <p className={styles.ending}>
                        <Editable value={story.ending} onChange={update.ending} placeholder="Ending goes here." textArea />
                    </p>

                    <h2>Themes <PlusCircleOutlined onClick={update.theme.add("")}/></h2>
                    <ul className={styles.themes}>
                        {story.themes.map((theme, i) => <li key={i}>
                            <Editable key={i} value={theme} onChange={update.theme.update(i)} placeholder="Theme goes here."/>
                            <DeleteBtn onClick={update.theme.remove(i)} />
                        </li>)}
                    </ul>
                </Col>
            </Row>
        </Spin>
    </div>;
}
