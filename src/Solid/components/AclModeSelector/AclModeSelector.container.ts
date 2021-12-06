import { inject, mergeProps } from "unstateless";
import {AclModeSelectorComponent} from "./AclModeSelector.component";
import {IAclModeSelectorInputProps, AclModeSelectorProps} from "./AclModeSelector.d";

const connect = inject<IAclModeSelectorInputProps, AclModeSelectorProps>(mergeProps((a:any) => a));

export const AclModeSelector = connect(AclModeSelectorComponent);
