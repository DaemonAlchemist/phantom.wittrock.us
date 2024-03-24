import { SendOutlined } from "@ant-design/icons";
import { Button, Spin } from "antd";
import { usePrompt } from "../../../lib/usePrompt";
import { systemPrompts, useMainCharacter, useOutline, useSceneBeats, useSceneOutlines, useSceneSummaries, useSupportingCharacters } from "../Storygen.helpers";
import { SceneProps } from "./Scene";
import { ISceneOutline } from "../StoryGen";
import JSON5 from 'json5';

export const SceneComponent = ({sceneNumber, ...curSceneOutline}:SceneProps) => {
    const [outline] = useOutline();
    const [mainCharacter] = useMainCharacter();
    const [supportingCharacters] = useSupportingCharacters();
    const [sceneOutlines] = useSceneOutlines();
    const [sceneSummaries] = useSceneSummaries();

    const [sceneBeats, setSceneBeats] = useSceneBeats();
    const updateBeats = (json:string) => {
        if(!json) {return;}
        try {
            setSceneBeats((old:string[][]):string[][] => {
                old[sceneNumber] = JSON5.parse(json).beats;
                return old;
            });
        } catch (err) {
            console.log(`Error parsing scene info: ${err}`);
        }
    }
    const beatsPrompt = usePrompt(systemPrompts.sceneBeats, updateBeats, true);

    const prevSceneSummaries:string[] = sceneSummaries.slice(0, sceneNumber - 1);
    const nextSceneOutlines:ISceneOutline[] = sceneOutlines.slice(sceneNumber + 1);

    const prompt = `
        Story outline: ${outline},
        main character: ${mainCharacter},
        supporting characters: ${JSON5.stringify(supportingCharacters)},
        previous scene summaries: ${JSON5.stringify(prevSceneSummaries)},
        current scene outline (This is the scene for which you are generating beats): ${JSON.stringify(curSceneOutline)},
        subsequent scene outlines: ${JSON5.stringify(nextSceneOutlines)}
    `;
    console.log(sceneBeats);

    return <Spin spinning={beatsPrompt.isRunning}>
        <Button onClick={beatsPrompt.run(prompt)} type="primary">
            <SendOutlined /> Create scene beats
        </Button>
        <ol>
            {(sceneBeats[sceneNumber] || []).map((beat, i) => <li key={i}>{beat}</li>)}
        </ol>
    </Spin>;
}
