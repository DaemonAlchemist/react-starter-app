import { inject, mergeProps } from "unstateless";
import {PermissionsComponent} from "./Permissions.component";
import {IPermissionsInputProps, PermissionsProps} from "./Permissions.d";

const connect = inject<IPermissionsInputProps, PermissionsProps>(mergeProps((a:any) => a));

export const Permissions = connect(PermissionsComponent);
