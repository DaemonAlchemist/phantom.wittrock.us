---
to: src/plugins/<%= plugin %>/components/<%= componentName %>/<%= componentName %>.container.ts
---
import { createInjector, inject, mergeProps } from "unstateless";
import {<%= componentName %>Component} from "./<%= componentName %>.component";
import {I<%= componentName %>InputProps, <%= componentName %>Props, I<%= componentName %>Props} from "./<%= componentName %>.d";

const inject<%= componentName %>Props = createInjector(({}:I<%= componentName %>InputProps):I<%= componentName %>Props => {
    return {};
});

const connect = inject<I<%= componentName %>InputProps, <%= componentName %>Props>(mergeProps(
    inject<%= componentName %>Props,
));

export const <%= componentName %> = connect(<%= componentName %>Component);
