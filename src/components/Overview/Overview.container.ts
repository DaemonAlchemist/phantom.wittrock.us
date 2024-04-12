import { createInjector, inject, mergeProps } from "unstateless";
import {OverviewComponent} from "./Overview.component";
import {IOverviewInputProps, OverviewProps, IOverviewProps} from "./Overview.d";

const injectOverviewProps = createInjector(({}:IOverviewInputProps):IOverviewProps => {
    return {};
});

const connect = inject<IOverviewInputProps, OverviewProps>(mergeProps(
    injectOverviewProps,
));

export const Overview = connect(OverviewComponent);
