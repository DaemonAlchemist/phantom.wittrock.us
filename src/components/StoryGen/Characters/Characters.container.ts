import { createInjector, inject, mergeProps } from "unstateless";
import {CharactersComponent} from "./Characters.component";
import {ICharactersInputProps, CharactersProps, ICharactersProps} from "./Characters";

const injectCharactersProps = createInjector(({}:ICharactersInputProps):ICharactersProps => {
    return {};
});

const connect = inject<ICharactersInputProps, CharactersProps>(mergeProps(
    injectCharactersProps,
));

export const Characters = connect(CharactersComponent);
