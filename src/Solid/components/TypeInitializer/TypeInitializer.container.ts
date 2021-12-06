import { inject, mergeProps } from "unstateless";
import {TypeInitializerComponent} from "./TypeInitializer.component";
import {ITypeInitializerInputProps, TypeInitializerProps} from "./TypeInitializer.d";

const connect = inject<ITypeInitializerInputProps, TypeInitializerProps>(mergeProps((a:any) => a));

export const TypeInitializer = connect(TypeInitializerComponent);
