import { createInjector, inject, mergeProps } from "unstateless";
import {PromptInfoModalComponent} from "./PromptInfoModal.component";
import {IPromptInfoModalInputProps, PromptInfoModalProps, IPromptInfoModalProps} from "./PromptInfoModal.d";

const injectPromptInfoModalProps = createInjector(({}:IPromptInfoModalInputProps):IPromptInfoModalProps => {
    return {};
});

const connect = inject<IPromptInfoModalInputProps, PromptInfoModalProps>(mergeProps(
    injectPromptInfoModalProps,
));

export const PromptInfoModal = connect(PromptInfoModalComponent);
