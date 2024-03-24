import { SendOutlined } from "@ant-design/icons";
import { Button, Spin, Table } from "antd";
import { usePrompt } from "../../../lib/usePrompt";
import { Scene } from "../Scene";
import { ISceneOutline } from "../StoryGen";
import { systemPrompts, useMainCharacter, useOutline, useSceneOutlines, useSupportingCharacters } from "../Storygen.helpers";
import { ScenesProps } from "./Scenes";
import JSON5 from 'json5';

export const ScenesComponent = ({}:ScenesProps) => {
    const [outline] = useOutline();
    const [mainCharacter] = useMainCharacter();
    const [supportingCharacters] = useSupportingCharacters();

    const [scenes, setScenes] = useSceneOutlines();
    const updateScenes = (json:string) => {
        if(!json) {return;}
        try {
            setScenes(JSON5.parse(json).scenes);
        } catch (err) {
            console.log(`Error parsing scene info: ${err}`);
        }
    }
    const scenePrompt = usePrompt(systemPrompts.sceneOutline, updateScenes, true);

    const expandedRowRender = (scene:ISceneOutline, sceneNumber:number) => <Scene sceneNumber={sceneNumber} {...scene} />;

    return <Spin spinning={scenePrompt.isRunning}>
        <Button
            onClick={scenePrompt.run(`Story outline: ${outline}, main character: ${mainCharacter}, supporting characters: ${JSON.stringify(supportingCharacters)}`)}
            type="primary"
        >
            <SendOutlined /> Generate scene outlines
        </Button>
        <Table dataSource={scenes} rowKey="outline" expandable={{rowExpandable: () => true, expandedRowRender}}>
            <Table.Column dataIndex="outline" title="Outline" />
            <Table.Column dataIndex="characters" title="Characters" render={(chars:string[]) => chars.join(", ")} />
        </Table>
    </Spin>
}
    
