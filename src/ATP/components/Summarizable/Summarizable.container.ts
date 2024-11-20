import { createInjector, inject, mergeProps } from "unstateless";
import {SummarizableComponent} from "./Summarizable.component";
import {ISummarizableInputProps, SummarizableProps, ISummarizableProps} from "./Summarizable";

const injectSummarizableProps = createInjector(({}:ISummarizableInputProps):ISummarizableProps => {
    return {};
});

const connect = inject<ISummarizableInputProps, SummarizableProps>(mergeProps(
    injectSummarizableProps,
));

export const Summarizable = connect(SummarizableComponent);
