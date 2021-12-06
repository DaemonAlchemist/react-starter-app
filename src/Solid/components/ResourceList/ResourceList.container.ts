import { inject, mergeProps } from "unstateless";
import {ResourceListComponent} from "./ResourceList.component";
import {IResourceListInputProps, ResourceListProps} from "./ResourceList.d";

const connect = inject<IResourceListInputProps, ResourceListProps>(mergeProps((a:any) => a));

export const ResourceList = connect(ResourceListComponent);
