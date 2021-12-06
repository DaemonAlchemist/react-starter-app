import { inject, mergeProps } from "unstateless";
import {LiveEditorComponent} from "./LiveEditor.component";
import {ILiveEditorInputProps, LiveEditorProps} from "./LiveEditor.d";

const connect = inject<ILiveEditorInputProps, LiveEditorProps>(mergeProps((a:any) => a));

export const LiveEditor = connect(LiveEditorComponent);
