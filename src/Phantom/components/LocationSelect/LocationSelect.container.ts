import { createInjector, inject, mergeProps } from "unstateless";
import {LocationSelectComponent} from "./LocationSelect.component";
import {ILocationSelectInputProps, LocationSelectProps, ILocationSelectProps} from "./LocationSelect";

const injectLocationSelectProps = createInjector(({}:ILocationSelectInputProps):ILocationSelectProps => {
    return {};
});

const connect = inject<ILocationSelectInputProps, LocationSelectProps>(mergeProps(
    injectLocationSelectProps,
));

export const LocationSelect = connect(LocationSelectComponent);
