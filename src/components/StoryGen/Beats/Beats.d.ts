export declare interface IBeatsProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IBeatsInputProps {
    actIndex: number;
    chapterIndex: number;
    sceneIndex: number;
}

export type BeatsProps = IBeatsInputProps & IBeatsProps;