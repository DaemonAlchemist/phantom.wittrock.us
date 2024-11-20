import { Func } from "ts-functional/dist/types";

export declare interface ICharacterSelectProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ICharacterSelectInputProps {
    characterIds: string[];
    onChange: Func<string[], void>;
}

export type CharacterSelectProps = ICharacterSelectInputProps & ICharacterSelectProps;