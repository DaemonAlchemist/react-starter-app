import { inject, mergeProps } from "unstateless";
import {LoginFormComponent} from "./LoginForm.component";
import {ILoginFormInputProps, LoginFormProps} from "./LoginForm.d";

const connect = inject<ILoginFormInputProps, LoginFormProps>(mergeProps((a:any) => a));

export const LoginForm = connect(LoginFormComponent);
