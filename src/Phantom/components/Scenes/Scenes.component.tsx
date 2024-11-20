import { PromptButton, SummarizeButton } from "@APP/lib/customButtons";
import { emptyScene, useStory } from "@APP/lib/useStory";
import { EntityHeader } from "@ATP/components/EntityHeader";
import { Summarizable } from "@ATP/components/Summarizable";
import { ArrowUpOutlined, BankOutlined, PlusCircleOutlined, TeamOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Popconfirm, Row } from "antd";
import { Beats } from "../Beats";
import { CharacterSelect } from "../CharacterSelect";
import { LocationSelect } from "../LocationSelect";
import { ICharacter, IScene } from "../StoryGen/story";
import { ScenesProps } from "./Scenes";
import styles from "./Scenes.module.scss";

export const ScenesComponent = ({actIndex, chapterIndex}:ScenesProps) => {
    const {story, update} = useStory();

    const updateScenes = (response:{scenes: IScene[], newCharacters: ICharacter[]}) => {
        response.scenes.forEach(scene => {update.scene.add(actIndex, chapterIndex, {
            ...scene,
            beats: [],
        })()});

        (response.newCharacters || []).forEach(char => {update.character.add(char)()});
    }

    const scenes = story.plot.acts[actIndex].chapters[chapterIndex].scenes || []; 

    return <div className={styles.scenes}>
        <Row>
            <Col xs={4}><h2>Scenes <PlusCircleOutlined onClick={update.scene.add(actIndex, chapterIndex, emptyScene)}/></h2></Col>
            <Col xs={20}>
                <PromptButton
                    promptId="scenes"
                    onUpdate={updateScenes}
                    finishMsg="has finished creating scenes for your chapter"
                    entityTypes="scenes"
                    promptParams={{actIndex, chapterIndex}}
                />
            </Col>
        </Row>
        <hr />
        <Collapse>
            {scenes.map((scene:IScene, i:number) => <Collapse.Panel
                className={styles.scene}
                header={<EntityHeader
                    type="Scene"
                    index={i}
                    title={scene.title}
                    subEntities={scene.beats}
                    subEntityFilter={b => !!b.text}
                    isFinished={scene.summary}
                    onDelete={update.scene.remove(actIndex, chapterIndex, i)}
                    move={update.scene.move(actIndex, chapterIndex)}
                    onUpdateTitle={update.scene.title(actIndex, chapterIndex, i)}
                />}
                key={i}
            >
                <div className={styles.sceneInfo}>
                    <BankOutlined /> <LocationSelect locationId={scene.locationId} onChange={update.scene.location(actIndex, chapterIndex, i)} />
                    &nbsp;&nbsp;&nbsp;
                    <TeamOutlined /> <CharacterSelect characterIds={scene.characterIds} onChange={update.scene.characters(actIndex, chapterIndex, i)}/>
                    &nbsp;&nbsp;
                    <Popconfirm title="Are you sure you want to convert this scene into a chapter?" onConfirm={update.scene.toChapter(actIndex, chapterIndex, i)}>
                        <Button className={styles.hoistBtn} type="default" size="small"><ArrowUpOutlined /> Convert to chapter</Button>
                    </Popconfirm>
                </div>
                <Row>
                    <Col xs={8}>
                        <Summarizable entity={scene} updateOutline={update.scene.outline(actIndex, chapterIndex, i)} updateSummary={update.scene.summary(actIndex, chapterIndex, i)}/>
                    </Col>
                    <Col xs={16}>
                        <Beats actIndex={actIndex} chapterIndex={chapterIndex} sceneIndex={i} />
                    </Col>
                </Row>                    
            </Collapse.Panel>)}
        </Collapse>
        <SummarizeButton
            entities={scenes}
            field="summary"
            entityName="chapter"
            promptId="chapter.summary"
            params={{actIndex, chapterIndex}}
            onUpdate={update.chapter.summary(actIndex, chapterIndex)}
        />
    </div>;
}
