import { inject, mergeProps } from "unstateless";
import {DebouncedInputComponent} from "./DebouncedInput.component";
import {IDebouncedInputInputProps, DebouncedInputProps} from "./DebouncedInput.d";

const connect = inject<IDebouncedInputInputProps, DebouncedInputProps>(mergeProps((a:any) => a));

export const DebouncedInput = connect(DebouncedInputComponent);
