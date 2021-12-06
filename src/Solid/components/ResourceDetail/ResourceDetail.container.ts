import { inject, mergeProps } from "unstateless";
import {ResourceDetailComponent} from "./ResourceDetail.component";
import {IResourceDetailInputProps, ResourceDetailProps} from "./ResourceDetail.d";

const connect = inject<IResourceDetailInputProps, ResourceDetailProps>(mergeProps((a:any) => a));

export const ResourceDetail = connect(ResourceDetailComponent);
