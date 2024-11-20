import { createInjector, inject, mergeProps } from "unstateless";
import {CharacterTypeSelectorComponent} from "./CharacterTypeSelector.component";
import {ICharacterTypeSelectorInputProps, CharacterTypeSelectorProps, ICharacterTypeSelectorProps} from "./CharacterTypeSelector";

const injectCharacterTypeSelectorProps = createInjector(({}:ICharacterTypeSelectorInputProps):ICharacterTypeSelectorProps => {
    return {};
});

const connect = inject<ICharacterTypeSelectorInputProps, CharacterTypeSelectorProps>(mergeProps(
    injectCharacterTypeSelectorProps,
));

export const CharacterTypeSelector = connect(CharacterTypeSelectorComponent);
