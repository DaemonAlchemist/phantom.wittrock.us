import { createInjector, inject, mergeProps } from "unstateless";
import {EditableComponent} from "./Editable.component";
import {IEditableInputProps, EditableProps, IEditableProps} from "./Editable.d";

const injectEditableProps = createInjector(({}:IEditableInputProps):IEditableProps => {
    return {};
});

const connect = inject<IEditableInputProps, EditableProps>(mergeProps(
    injectEditableProps,
));

export const Editable = connect(EditableComponent);
