import { ISceneOutline } from "../StoryGen/StoryGen";

export declare interface IScenesProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IScenesInputProps {
    actIndex: number;
    chapterIndex: number;
}

export type ScenesProps = IScenesInputProps & IScenesProps;