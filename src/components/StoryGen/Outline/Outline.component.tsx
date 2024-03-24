import { DeleteOutlined, PlusCircleOutlined, SendOutlined } from "@ant-design/icons";
import { Alert, Button, Col, Input, Row, Spin, Typography } from "antd";
import { onInputChange } from "../../../lib/onInputChange";
import { useStory } from "../../../lib/storyGen/useStory";
import { usePrompt } from "../../../lib/usePrompt";
import { systemPrompts, useIdea } from "../Storygen.helpers";
import { OutlineProps } from "./Outline";
import styles from "./Outline.module.scss";
import { IStoryOutline } from "../story";
import { Editable } from "../../Editable";

export const OutlineComponent = ({}:OutlineProps) => {
    const [idea, setIdea] = useIdea();
    const {story, update} = useStory();

    const updateStory = (details:IStoryOutline) => {
        update.story(old => ({
            ...old,
            title: details.title,
            genre: details.genre,
            themes: details.themes,
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

    const prompt = usePrompt(systemPrompts.outline, updateStory);
        
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
                    </div>

                    <h2>Story Outline</h2>
                    <p className={styles.plotOutline}>
                        <Editable value={story.plot.outline} onChange={update.plot.outline} placeholder="Story outline goes here." textArea/>
                    </p>

                    <h2>Themes <PlusCircleOutlined onClick={update.theme.add("")}/></h2>
                    <ul className={styles.themes}>
                        {story.themes.map((theme, i) => <li key={i}>
                            <Editable key={i} value={theme} onChange={update.theme.update(i)} placeholder="Theme goes here."/>
                            <Typography.Text type="danger">
                                <DeleteOutlined onClick={update.theme.remove(i)}/>
                            </Typography.Text>
                        </li>)}
                    </ul>
                </Col>
            </Row>
        </Spin>
    </div>;
}
