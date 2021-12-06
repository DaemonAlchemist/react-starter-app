import { inject, mergeProps } from "unstateless";
import {ValueTypeGroupInputComponent} from "./ValueTypeGroupInput.component";
import {IValueTypeGroupInputInputProps, ValueTypeGroupInputProps} from "./ValueTypeGroupInput.d";

const connect = inject<IValueTypeGroupInputInputProps, ValueTypeGroupInputProps>(mergeProps((a:any) => a));

export const ValueTypeGroupInput = connect(ValueTypeGroupInputComponent);
