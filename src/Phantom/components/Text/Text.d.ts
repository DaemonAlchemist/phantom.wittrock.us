export declare interface ITextProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ITextInputProps {
    actIndex: number;
    chapterIndex: number;
    sceneIndex: number;
    beatIndex: number;
}

export type TextProps = ITextInputProps & ITextProps;