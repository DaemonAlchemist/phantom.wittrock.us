import { createInjector, inject, mergeProps } from "unstateless";
import {PromptButtonComponent} from "./PromptButton.component";
import {IPromptButtonInputProps, PromptButtonProps, IPromptButtonProps} from "./PromptButton.d";

const injectPromptButtonProps = createInjector(({}:IPromptButtonInputProps):IPromptButtonProps => {
    return {};
});

const connect = inject<IPromptButtonInputProps, PromptButtonProps>(mergeProps(
    injectPromptButtonProps,
));

export const PromptButton = connect(PromptButtonComponent);
