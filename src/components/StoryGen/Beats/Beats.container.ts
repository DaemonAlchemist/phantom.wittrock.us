import { createInjector, inject, mergeProps } from "unstateless";
import {BeatsComponent} from "./Beats.component";
import {IBeatsInputProps, BeatsProps, IBeatsProps} from "./Beats";

const injectBeatsProps = createInjector(({}:IBeatsInputProps):IBeatsProps => {
    return {};
});

const connect = inject<IBeatsInputProps, BeatsProps>(mergeProps(
    injectBeatsProps,
));

export const Beats = connect(BeatsComponent);
