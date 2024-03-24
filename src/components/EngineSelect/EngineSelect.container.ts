import { createInjector, inject, mergeProps } from "unstateless";
import {EngineSelectComponent} from "./EngineSelect.component";
import {IEngineSelectInputProps, EngineSelectProps, IEngineSelectProps} from "./EngineSelect.d";

const injectEngineSelectProps = createInjector(({}:IEngineSelectInputProps):IEngineSelectProps => {
    return {};
});

const connect = inject<IEngineSelectInputProps, EngineSelectProps>(mergeProps(
    injectEngineSelectProps,
));

export const EngineSelect = connect(EngineSelectComponent);
