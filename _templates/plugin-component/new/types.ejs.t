---
to: src/plugins/<%= plugin %>/components/<%= componentName %>/<%= componentName %>.d.ts
---
export declare interface I<%= componentName %>Props {

}

// What gets passed into the component from the parent as attributes
export declare interface I<%= componentName %>InputProps {

}

export type <%= componentName %>Props = I<%= componentName %>InputProps & I<%= componentName %>Props;