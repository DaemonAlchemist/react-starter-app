---
to: src/components/<%= componentName %>/<%= componentName %>.component.tsx
---
import React from 'react';
import {<%= componentName %>Props} from "./<%= componentName %>.d";
import './<%= componentName %>.scss';

export const <%= componentName %>Component = (props:<%= componentName %>Props) =>
    <div><%= componentName %> component goes here.</div>;
