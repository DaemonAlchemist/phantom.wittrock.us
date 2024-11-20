import { createInjector, inject, mergeProps } from "unstateless";
import {ScenesComponent} from "./Scenes.component";
import {IScenesInputProps, ScenesProps, IScenesProps} from "./Scenes";

const injectScenesProps = createInjector(({}:IScenesInputProps):IScenesProps => {
    return {};
});

const connect = inject<IScenesInputProps, ScenesProps>(mergeProps(
    injectScenesProps,
));

export const Scenes = connect(ScenesComponent);
