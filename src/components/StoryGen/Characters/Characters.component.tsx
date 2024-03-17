import { SendOutlined } from "@ant-design/icons";
import { Button, Spin, Table } from "antd";
import { usePrompt } from "../../../lib/usePrompt";
import { systemPrompts, useMainCharacter, useOutline, useSupportingCharacters } from "../Storygen.helpers";
import { CharactersProps } from "./Characters";

export const CharactersComponent = ({}:CharactersProps) => {
    const [outline] = useOutline();

    const [mainCharacter, setMainCharacter] = useMainCharacter();
    const mcPrompt = usePrompt(systemPrompts.mainCharacter, setMainCharacter);

    const [supportingCharacters, setSupportingCharacters] = useSupportingCharacters();
    const updateCharacters = (json:string) => {
        try {
            setSupportingCharacters(JSON.parse(json).characters);
        } catch (err) {
            console.log(`Error parsing supporting character info: ${err}`);
        }
    }
    const spPrompt = usePrompt(systemPrompts.supportingCharacters, updateCharacters, true);

    return <Spin spinning={mcPrompt.isRunning || spPrompt.isRunning}>
        <Button onClick={mcPrompt.run(`Story outline: ${outline}`)} type="primary">
            <SendOutlined /> Generate main character
        </Button>
        <p>{mainCharacter}</p>
        <Button onClick={spPrompt.run(`Story outline: ${outline}, main character: ${mainCharacter}`)} type="primary">
            <SendOutlined /> Generate supporting characters
        </Button>
        <Table dataSource={supportingCharacters}>
            <Table.Column dataIndex="name" title="Name" />
            <Table.Column dataIndex="description" title="Description" />
            <Table.Column dataIndex="backStory" title="Backstory" />
            <Table.Column dataIndex="relationship" title="Relationship" />
            <Table.Column dataIndex="mainCharacterArcSupport" title="Arc Support" />
        </Table>
    </Spin>
}
