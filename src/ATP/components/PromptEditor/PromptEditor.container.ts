import { createInjector, inject, mergeProps } from "unstateless";
import {PromptEditorComponent} from "./PromptEditor.component";
import {IPromptEditorInputProps, PromptEditorProps, IPromptEditorProps} from "./PromptEditor";

const injectPromptEditorProps = createInjector(({}:IPromptEditorInputProps):IPromptEditorProps => {
    return {};
});

const connect = inject<IPromptEditorInputProps, PromptEditorProps>(mergeProps(
    injectPromptEditorProps,
));

export const PromptEditor = connect(PromptEditorComponent);
