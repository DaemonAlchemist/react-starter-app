import { inject, mergeProps } from "unstateless";
import {WIPComponent} from "./WIP.component";
import {IWIPInputProps, WIPProps} from "./WIP.d";

const connect = inject<IWIPInputProps, WIPProps>(mergeProps((a:any) => a));

export const WIP = connect(WIPComponent);
