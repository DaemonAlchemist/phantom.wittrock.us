export declare interface IPromptInfoModalProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IPromptInfoModalInputProps {
    lastPrompt?: string;
    systemPrompt: string;
}

export type PromptInfoModalProps = IPromptInfoModalInputProps & IPromptInfoModalProps;