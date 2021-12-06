import { inject, mergeProps } from "unstateless";
import {TermComponent} from "./Term.component";
import {ITermInputProps, TermProps} from "./Term.d";

const connect = inject<ITermInputProps, TermProps>(mergeProps((a:any) => a));

export const Term = connect(TermComponent);
