import { createInjector, inject, mergeProps } from "unstateless";
import {AppComponent} from "./App.component";
import {IAppInputProps, AppProps, IAppProps} from "./App.d";

const injectAppProps = createInjector(({}:IAppInputProps):IAppProps => {
    return {};
});

const connect = inject<IAppInputProps, AppProps>(mergeProps(
    injectAppProps,
));

export const App = connect(AppComponent);
