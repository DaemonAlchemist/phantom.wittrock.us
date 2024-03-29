import { createInjector, inject, mergeProps } from "unstateless";
import {ReadComponent} from "./Read.component";
import {IReadInputProps, ReadProps, IReadProps} from "./Read";

const injectReadProps = createInjector(({}:IReadInputProps):IReadProps => {
    return {};
});

const connect = inject<IReadInputProps, ReadProps>(mergeProps(
    injectReadProps,
));

export const Read = connect(ReadComponent);
