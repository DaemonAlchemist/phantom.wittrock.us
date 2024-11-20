import { Func } from "ts-functional/dist/types";
import { IPromptParams } from "@ATP/lib/usePrompt";

export declare interface IPromptButtonProps {

}

// What gets passed into the component from the parent as attributes
export declare interface IPromptButtonInputProps {
    promptId: string;
    compilePrompt: (promptId:string, params:IPromptParams) => string;
    onUpdate: Func<any, void>;
    finishMsg?: string;
    entityTypes: string;
    suffix?: string | JSX.Element;
    btnText?: string;
    starter?:string;
    promptParams: IPromptParams;
}

export type PromptButtonProps = IPromptButtonInputProps & IPromptButtonProps;