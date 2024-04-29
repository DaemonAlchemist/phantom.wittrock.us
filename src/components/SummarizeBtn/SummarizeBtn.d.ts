import { IPromptParams } from "../../lib/usePrompt";

export declare interface ISummarizeBtnProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ISummarizeBtnInputProps {
    entities: any[];
    field: string;
    entityName: string;
    promptId: string;
    params:IPromptParams;
    onUpdate: (summary: string) => void;
}

export type SummarizeBtnProps = ISummarizeBtnInputProps & ISummarizeBtnProps;