import { inject, mergeProps } from "unstateless";
import {ResourceComponent} from "./Resource.component";
import {IResourceInputProps, ResourceProps} from "./Resource.d";

const connect = inject<IResourceInputProps, ResourceProps>(mergeProps((a:any) => a));

export const Resource = connect(ResourceComponent);
