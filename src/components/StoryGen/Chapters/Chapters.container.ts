import { createInjector, inject, mergeProps } from "unstateless";
import {ChaptersComponent} from "./Chapters.component";
import {IChaptersInputProps, ChaptersProps, IChaptersProps} from "./Chapters";

const injectChaptersProps = createInjector(({}:IChaptersInputProps):IChaptersProps => {
    return {};
});

const connect = inject<IChaptersInputProps, ChaptersProps>(mergeProps(
    injectChaptersProps,
));

export const Chapters = connect(ChaptersComponent);
