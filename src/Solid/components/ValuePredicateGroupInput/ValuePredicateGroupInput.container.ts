import { inject, mergeProps } from "unstateless";
import {ValuePredicateGroupInputComponent} from "./ValuePredicateGroupInput.component";
import {IValuePredicateGroupInputInputProps, ValuePredicateGroupInputProps} from "./ValuePredicateGroupInput.d";

const connect = inject<IValuePredicateGroupInputInputProps, ValuePredicateGroupInputProps>(mergeProps((a:any) => a));

export const ValuePredicateGroupInput = connect(ValuePredicateGroupInputComponent);
