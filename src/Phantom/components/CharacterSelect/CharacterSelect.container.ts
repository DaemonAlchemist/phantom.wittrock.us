import { createInjector, inject, mergeProps } from "unstateless";
import {CharacterSelectComponent} from "./CharacterSelect.component";
import {ICharacterSelectInputProps, CharacterSelectProps, ICharacterSelectProps} from "./CharacterSelect";

const injectCharacterSelectProps = createInjector(({}:ICharacterSelectInputProps):ICharacterSelectProps => {
    return {};
});

const connect = inject<ICharacterSelectInputProps, CharacterSelectProps>(mergeProps(
    injectCharacterSelectProps,
));

export const CharacterSelect = connect(CharacterSelectComponent);
