export declare interface IStoryGenProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IStoryGenInputProps {

}

export type StoryGenProps = IStoryGenInputProps & IStoryGenProps;

export declare interface ICharacter {
    name: string;
    description: string;
    relationship: string;
    mainCharacterArcSupport;
}