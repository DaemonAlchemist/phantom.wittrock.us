import { createInjector, inject, mergeProps } from "unstateless";
import {EntityHeaderComponent} from "./EntityHeader.component";
import {IEntityHeaderInputProps, EntityHeaderProps, IEntityHeaderProps} from "./EntityHeader.d";

const injectEntityHeaderProps = createInjector(({}:IEntityHeaderInputProps):IEntityHeaderProps => {
    return {};
});

const connect = inject<IEntityHeaderInputProps, EntityHeaderProps>(mergeProps(
    injectEntityHeaderProps,
));

export const EntityHeader = connect(EntityHeaderComponent);
