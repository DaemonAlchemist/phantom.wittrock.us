import { ISceneOutline } from "../StoryGen";

export declare interface ISceneProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ISceneInputProps extends ISceneOutline {
    sceneNumber: number;
}

export type SceneProps = ISceneInputProps & ISceneProps;