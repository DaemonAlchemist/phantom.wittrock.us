import { createInjector, inject, mergeProps } from "unstateless";
import {StoryGenComponent} from "./StoryGen.component";
import {IStoryGenInputProps, StoryGenProps, IStoryGenProps} from "./StoryGen.d";

const injectStoryGenProps = createInjector(({}:IStoryGenInputProps):IStoryGenProps => {
    return {};
});

const connect = inject<IStoryGenInputProps, StoryGenProps>(mergeProps(
    injectStoryGenProps,
));

export const StoryGen = connect(StoryGenComponent);
