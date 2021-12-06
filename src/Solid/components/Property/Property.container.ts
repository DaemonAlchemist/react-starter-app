import { inject, mergeProps } from "unstateless";
import {PropertyComponent} from "./Property.component";
import {IPropertyInputProps, PropertyProps} from "./Property.d";

const connect = inject<IPropertyInputProps, PropertyProps>(mergeProps((a:any) => a));

export const Property = connect(PropertyComponent);
