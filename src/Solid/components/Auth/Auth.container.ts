import { inject, mergeProps } from "unstateless";
import {AuthComponent} from "./Auth.component";
import {IAuthInputProps, AuthProps} from "./Auth.d";

const connect = inject<IAuthInputProps, AuthProps>(mergeProps((a:any) => a));

export const Auth = connect(AuthComponent);
