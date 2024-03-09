---
to: src/plugins/<%= plugin %>/components/<%= componentName %>/<%= componentName %>.component.tsx
---
import {<%= componentName %>Props} from "./<%= componentName %>.d";
import styles from './<%= componentName %>.module.scss';

export const <%= componentName %>Component = ({}:<%= componentName %>Props) =>
    <div><%= componentName %> component goes here.</div>;
