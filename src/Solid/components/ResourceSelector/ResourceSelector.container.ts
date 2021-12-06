import { inject, mergeProps } from "unstateless";
import {ResourceSelectorComponent} from "./ResourceSelector.component";
import {IResourceSelectorInputProps, ResourceSelectorProps} from "./ResourceSelector.d";

const connect = inject<IResourceSelectorInputProps, ResourceSelectorProps>(mergeProps((a:any) => a));

export const ResourceSelector = connect(ResourceSelectorComponent);
