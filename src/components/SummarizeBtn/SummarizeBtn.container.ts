import { createInjector, inject, mergeProps } from "unstateless";
import {SummarizeBtnComponent} from "./SummarizeBtn.component";
import {ISummarizeBtnInputProps, SummarizeBtnProps, ISummarizeBtnProps} from "./SummarizeBtn.d";

const injectSummarizeBtnProps = createInjector(({}:ISummarizeBtnInputProps):ISummarizeBtnProps => {
    return {};
});

const connect = inject<ISummarizeBtnInputProps, SummarizeBtnProps>(mergeProps(
    injectSummarizeBtnProps,
));

export const SummarizeBtn = connect(SummarizeBtnComponent);
