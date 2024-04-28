import { Col, Row, Tabs } from "antd";
import { useState } from "react";
import { useStory } from "../../../lib/storyGen/useStory";
import { CharacterTypeSelector } from "../../CharacterTypeSelector";
import { DeleteBtn } from "../../DeleteBtn";
import { Editable } from "../../Editable";
import { PromptButton } from "../../PromptButton";
import { CharacterType, ICharacter } from "../story.d";
import { CharactersProps } from "./Characters";
import styles from "./Characters.module.scss";

export const CharactersComponent = ({}:CharactersProps) => {
    const {story, update} = useStory();

    const updateCharacters = (response:{characters:ICharacter[]}) => {
        response.characters.forEach(char => {update.character.add(char)()});
    }

    const [role, setRole] = useState<CharacterType>("main");

    return <>
        <Row>
            <Col xs={4}><h2>Characters</h2></Col>
            <Col xs={20}>
                <PromptButton
                    promptId={`characters.${role}`}
                    onUpdate={updateCharacters}
                    finishMsg="has finished creating characters"
                    entityTypes="characters"
                    suffix={<CharacterTypeSelector role={role} onChange={setRole} />}
                    promptParams={{}}
                />
            </Col>
        </Row>
        <hr />
        <ul className={styles.characters}>
            {story.characters.map((char, i) => <li key={i}>
                <h2 className={styles.name}>
                    <Editable value={char.name} onChange={update.character.name(i)} placeholder="Character name here" />
                    <CharacterTypeSelector role={char.role} onChange={update.character.role(i)} />
                    <DeleteBtn onClick={update.character.remove(i)} entityType="character"/>
                </h2>
                <div className={styles.info}>
                    <Tabs tabPosition="left">
                        <Tabs.TabPane key="description" tabKey="description" tab="Description">
                            <p>Description</p>
                            <Editable value={char.physicalDescription} onChange={update.character.description(i)} placeholder="Physical description goes here." textArea/>

                            <p>Identifying Marks</p>
                            <Editable value={char.identifyingMarks} onChange={update.character.marks(i)} placeholder="Identifying marks go here." textArea />

                            <p>Ethnicity</p>
                            <Editable value={char.ethnicity} onChange={update.character.ethnicity(i)} placeholder="Ethnicity goes here" textArea/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="personality" tabKey="personality" tab="Personality">
                            <p>Gender Identity</p>
                            <Editable value={char.genderIdentity} onChange={update.character.gender(i)} placeholder="Gender identity goes here" textArea/>

                            <p>Personality</p>
                            <Editable value={char.personality} onChange={update.character.personality(i)} placeholder="Personality goes here." textArea/>

                            <p>Quirks</p>
                            <Editable value={char.quirks} onChange={update.character.quirks(i)} placeholder="Quirks go here." textArea />
                        </Tabs.TabPane>
                        <Tabs.TabPane key="backstory" tabKey="backstory" tab="Backstory">
                            <Editable value={char.backstory} onChange={update.character.backstory(i)} placeholder="Backstory goes here." textArea/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="arc" tabKey="arc" tab="Story Arc">
                            <Editable value={char.storyArc} onChange={update.character.arc(i)} placeholder="Story arc goes here." textArea/>
                        </Tabs.TabPane>
                        <Tabs.TabPane key="goals" tabKey="goals" tab="Goals">
                            <p>Goals</p>
                            <Editable value={char.goals} onChange={update.character.goals(i)} placeholder="Goal goes here." textArea/>

                            <p>Motivations</p>
                            <Editable value={char.motivations} onChange={update.character.motivations(i)} placeholder="Motivations goes here." textArea/>
                        </Tabs.TabPane>
                    </Tabs>
                </div>
                <div className={styles.id}>
                    <Editable value={char.id} onChange={update.character.id(i)} placeholder="idGoesHere" />
                </div>
            </li>)}
        </ul>
    </>
}
