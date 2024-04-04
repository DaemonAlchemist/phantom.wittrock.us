import { createInjector, inject, mergeProps } from "unstateless";
import {PartsDoneComponent} from "./PartsDone.component";
import {IPartsDoneInputProps, PartsDoneProps, IPartsDoneProps} from "./PartsDone.d";

const injectPartsDoneProps = createInjector(({}:IPartsDoneInputProps):IPartsDoneProps => {
    return {};
});

const connect = inject<IPartsDoneInputProps, PartsDoneProps>(mergeProps(
    injectPartsDoneProps,
));

export const PartsDone = connect(PartsDoneComponent);
