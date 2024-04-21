import { createInjector, inject, mergeProps } from "unstateless";
import {ModelSelectComponent} from "./ModelSelect.component";
import {IModelSelectInputProps, ModelSelectProps, IModelSelectProps} from "./ModelSelect.d";

const injectModelSelectProps = createInjector(({}:IModelSelectInputProps):IModelSelectProps => {
    return {};
});

const connect = inject<IModelSelectInputProps, ModelSelectProps>(mergeProps(
    injectModelSelectProps,
));

export const ModelSelect = connect(ModelSelectComponent);
