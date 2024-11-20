import { createInjector, inject, mergeProps } from "unstateless";
import {LocationsComponent} from "./Locations.component";
import {ILocationsInputProps, LocationsProps, ILocationsProps} from "./Locations";

const injectLocationsProps = createInjector(({}:ILocationsInputProps):ILocationsProps => {
    return {};
});

const connect = inject<ILocationsInputProps, LocationsProps>(mergeProps(
    injectLocationsProps,
));

export const Locations = connect(LocationsComponent);
