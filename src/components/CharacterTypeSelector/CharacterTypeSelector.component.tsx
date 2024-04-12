import { Radio } from "antd";
import { Func } from "ts-functional/dist/types";
import { onRadioChange } from "../../lib/onInputChange";
import { CharacterTypeSelectorProps } from "./CharacterTypeSelector.d";

export const CharacterTypeSelectorComponent = ({role, onChange}:CharacterTypeSelectorProps) =>
    <Radio.Group
        value={role}
        options={["main", "supporting", "minor"]}
        onChange={onRadioChange(onChange as Func<string, void>)}
        optionType="button"
        buttonStyle="solid"
        size="small"
/>
;
