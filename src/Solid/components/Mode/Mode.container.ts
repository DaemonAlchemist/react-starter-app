import { inject, mergeProps } from "unstateless";
import {ModeComponent} from "./Mode.component";
import {IModeInputProps, ModeProps} from "./Mode.d";

const connect = inject<IModeInputProps, ModeProps>(mergeProps((a:any) => a));

export const Mode = connect(ModeComponent);
