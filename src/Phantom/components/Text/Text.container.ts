import { createInjector, inject, mergeProps } from "unstateless";
import {TextComponent} from "./Text.component";
import {ITextInputProps, TextProps, ITextProps} from "./Text";

const injectTextProps = createInjector(({}:ITextInputProps):ITextProps => {
    return {};
});

const connect = inject<ITextInputProps, TextProps>(mergeProps(
    injectTextProps,
));

export const Text = connect(TextComponent);
