import { inject, mergeProps } from "unstateless";
import {SessionComponent} from "./Session.component";
import {ISessionInputProps, SessionProps} from "./Session.d";

const connect = inject<ISessionInputProps, SessionProps>(mergeProps((a:any) => a));

export const Session = connect(SessionComponent);
