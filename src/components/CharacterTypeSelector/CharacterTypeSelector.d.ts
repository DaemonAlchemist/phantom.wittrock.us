import { CharacterType } from "../StoryGen/story";

export declare interface ICharacterTypeSelectorProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ICharacterTypeSelectorInputProps {
    role: CharacterType;
    onChange: (role:CharacterType) => void;
}

export type CharacterTypeSelectorProps = ICharacterTypeSelectorInputProps & ICharacterTypeSelectorProps;