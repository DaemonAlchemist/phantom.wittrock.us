export declare interface ISummarizable {
    outline: string;
    summary: string;
}

export declare interface ISummarizableProps {

}

// What gets passed into the component from the parent as attributes
export declare interface ISummarizableInputProps {
    entity: ISummarizable;
    updateOutline: (outline:string) => void;
    updateSummary: (summary:string) => void;
    hideSummary?: boolean;
}

export type SummarizableProps = ISummarizableInputProps & ISummarizableProps;