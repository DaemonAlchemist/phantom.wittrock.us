import { createInjector, inject, mergeProps } from "unstateless";
import {IsFinishedComponent} from "./IsFinished.component";
import {IIsFinishedInputProps, IsFinishedProps, IIsFinishedProps} from "./IsFinished.d";

const injectIsFinishedProps = createInjector(({}:IIsFinishedInputProps):IIsFinishedProps => {
    return {};
});

const connect = inject<IIsFinishedInputProps, IsFinishedProps>(mergeProps(
    injectIsFinishedProps,
));

export const IsFinished = connect(IsFinishedComponent);
