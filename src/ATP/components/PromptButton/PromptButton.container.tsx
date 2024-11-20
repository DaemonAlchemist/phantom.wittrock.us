import { createInjector, inject, mergeProps } from "unstateless";
import { IPromptParams } from "@ATP/lib/usePrompt";
import { IPromptButtonInputProps, IPromptButtonProps, PromptButtonProps } from "./PromptButton";
import { PromptButtonComponent } from "./PromptButton.component";

const injectPromptButtonProps = createInjector(({}:IPromptButtonInputProps):IPromptButtonProps => {
    return {};
});

const connect = inject<IPromptButtonInputProps, PromptButtonProps>(mergeProps(
    injectPromptButtonProps,
));

export const PromptButton = connect(PromptButtonComponent);

export const customPromptButton = (compilePrompt:(promptId:string, params:IPromptParams) => string) =>
    (props:Omit<IPromptButtonInputProps, "compilePrompt">) =>
        <PromptButton compilePrompt={compilePrompt} {...props} />;
