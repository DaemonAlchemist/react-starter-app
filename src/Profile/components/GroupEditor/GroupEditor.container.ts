import { inject, mergeProps } from "unstateless";
import {GroupEditorComponent} from "./GroupEditor.component";
import {IGroupEditorInputProps, GroupEditorProps} from "./GroupEditor.d";

const connect = inject<IGroupEditorInputProps, GroupEditorProps>(mergeProps((a:any) => a));

export const GroupEditor = connect(GroupEditorComponent);
