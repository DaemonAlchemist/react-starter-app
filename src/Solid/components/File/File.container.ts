import { inject, mergeProps } from "unstateless";
import {FileComponent} from "./File.component";
import {IFileInputProps, FileProps} from "./File.d";

const connect = inject<IFileInputProps, FileProps>(mergeProps((a:any) => a));

export const File = connect(FileComponent);
