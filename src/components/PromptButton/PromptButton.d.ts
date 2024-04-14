import { Func } from "ts-functional/dist/types";

export declare interface IPromptButtonProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IPromptButtonInputProps {
    systemPrompt: string;
    userPrompt: string;
    onUpdate: Func<any, void>;
    entityTypes: string;
    suffix?: string | JSX.Element;
    btnText?: string;
}

export type PromptButtonProps = IPromptButtonInputProps & IPromptButtonProps;