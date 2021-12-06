import { inject, mergeProps } from "unstateless";
import {DirectoryCreateFormComponent} from "./DirectoryCreateForm.component";
import {IDirectoryCreateFormInputProps, DirectoryCreateFormProps} from "./DirectoryCreateForm.d";

const connect = inject<IDirectoryCreateFormInputProps, DirectoryCreateFormProps>(mergeProps((a:any) => a));

export const DirectoryCreateForm = connect(DirectoryCreateFormComponent);
