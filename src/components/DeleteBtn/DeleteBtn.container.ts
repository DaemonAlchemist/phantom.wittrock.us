import { createInjector, inject, mergeProps } from "unstateless";
import {DeleteBtnComponent} from "./DeleteBtn.component";
import {IDeleteBtnInputProps, DeleteBtnProps, IDeleteBtnProps} from "./DeleteBtn.d";

const injectDeleteBtnProps = createInjector(({}:IDeleteBtnInputProps):IDeleteBtnProps => {
    return {};
});

const connect = inject<IDeleteBtnInputProps, DeleteBtnProps>(mergeProps(
    injectDeleteBtnProps,
));

export const DeleteBtn = connect(DeleteBtnComponent);
