import { createInjector, inject, mergeProps } from "unstateless";
import {SceneComponent} from "./Scene.component";
import {ISceneInputProps, SceneProps, ISceneProps} from "./Scene";

const injectSceneProps = createInjector(({}:ISceneInputProps):ISceneProps => {
    return {};
});

const connect = inject<ISceneInputProps, SceneProps>(mergeProps(
    injectSceneProps,
));

export const Scene = connect(SceneComponent);
