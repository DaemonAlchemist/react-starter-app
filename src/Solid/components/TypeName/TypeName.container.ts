import { inject, mergeProps } from "unstateless";
import {TypeNameComponent} from "./TypeName.component";
import {ITypeNameInputProps, TypeNameProps} from "./TypeName.d";

const connect = inject<ITypeNameInputProps, TypeNameProps>(mergeProps((a:any) => a));

export const TypeName = connect(TypeNameComponent);
