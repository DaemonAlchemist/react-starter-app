import { inject, mergeProps } from "unstateless";
import {DeleteSubjectButtonComponent} from "./DeleteSubjectButton.component";
import {IDeleteSubjectButtonInputProps, DeleteSubjectButtonProps} from "./DeleteSubjectButton.d";

const connect = inject<IDeleteSubjectButtonInputProps, DeleteSubjectButtonProps>(mergeProps((a:any) => a));

export const DeleteSubjectButton = connect(DeleteSubjectButtonComponent);
