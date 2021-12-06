import { inject, mergeProps } from "unstateless";
import {GroupCreateFormComponent} from "./GroupCreateForm.component";
import {IGroupCreateFormInputProps, GroupCreateFormProps} from "./GroupCreateForm.d";

const connect = inject<IGroupCreateFormInputProps, GroupCreateFormProps>(mergeProps((a:any) => a));

export const GroupCreateForm = connect(GroupCreateFormComponent);
