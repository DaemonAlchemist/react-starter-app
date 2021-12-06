import { inject, mergeProps } from "unstateless";
import {NamedNodeSelectComponent} from "./NamedNodeSelect.component";
import {INamedNodeSelectInputProps, NamedNodeSelectProps} from "./NamedNodeSelect.d";

const connect = inject<INamedNodeSelectInputProps, NamedNodeSelectProps>(mergeProps((a:any) => a));

export const NamedNodeSelect = connect(NamedNodeSelectComponent);
