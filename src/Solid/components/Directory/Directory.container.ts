import { inject, mergeProps } from "unstateless";
import {DirectoryComponent} from "./Directory.component";
import {IDirectoryInputProps, DirectoryProps} from "./Directory.d";

const connect = inject<IDirectoryInputProps, DirectoryProps>(mergeProps((a:any) => a));

export const Directory = connect(DirectoryComponent);
