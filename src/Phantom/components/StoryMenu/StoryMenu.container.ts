import { createInjector, inject, mergeProps } from "unstateless";
import {StoryMenuComponent} from "./StoryMenu.component";
import {IStoryMenuInputProps, StoryMenuProps, IStoryMenuProps} from "./StoryMenu";

const injectStoryMenuProps = createInjector(({}:IStoryMenuInputProps):IStoryMenuProps => {
    return {};
});

const connect = inject<IStoryMenuInputProps, StoryMenuProps>(mergeProps(
    injectStoryMenuProps,
));

export const StoryMenu = connect(StoryMenuComponent);
