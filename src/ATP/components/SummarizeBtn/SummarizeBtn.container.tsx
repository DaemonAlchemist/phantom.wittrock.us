import { createInjector, inject, mergeProps } from "unstateless";
import {SummarizeBtnComponent} from "./SummarizeBtn.component";
import {ISummarizeBtnInputProps, SummarizeBtnProps, ISummarizeBtnProps} from "./SummarizeBtn";
import { IPromptParams } from "@ATP/lib/usePrompt";

const injectSummarizeBtnProps = createInjector(({}:ISummarizeBtnInputProps):ISummarizeBtnProps => {
    return {};
});

const connect = inject<ISummarizeBtnInputProps, SummarizeBtnProps>(mergeProps(
    injectSummarizeBtnProps,
));

export const SummarizeBtn = connect(SummarizeBtnComponent);

export const customSummarizeButton = (compilePrompt:(promptId:string, params:IPromptParams) => string) =>
    (props:Omit<ISummarizeBtnInputProps, "compilePrompt">) =>
        <SummarizeBtn compilePrompt={compilePrompt} {...props} />;
