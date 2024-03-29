import { createInjector, inject, mergeProps } from "unstateless";
import {ActsComponent} from "./Acts.component";
import {IActsInputProps, ActsProps, IActsProps} from "./Acts";

const injectActsProps = createInjector(({}:IActsInputProps):IActsProps => {
    return {};
});

const connect = inject<IActsInputProps, ActsProps>(mergeProps(
    injectActsProps,
));

export const Acts = connect(ActsComponent);
