import { createInjector, inject, mergeProps } from "unstateless";
import {OutlineComponent} from "./Outline.component";
import {IOutlineInputProps, OutlineProps, IOutlineProps} from "./Outline";

const injectOutlineProps = createInjector(({}:IOutlineInputProps):IOutlineProps => {
    return {};
});

const connect = inject<IOutlineInputProps, OutlineProps>(mergeProps(
    injectOutlineProps,
));

export const Outline = connect(OutlineComponent);
