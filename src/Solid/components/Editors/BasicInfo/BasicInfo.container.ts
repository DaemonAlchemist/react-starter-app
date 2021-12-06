import { inject, mergeProps } from "unstateless";
import {BasicInfoComponent} from "./BasicInfo.component";
import {IBasicInfoInputProps, BasicInfoProps} from "./BasicInfo.d";

const connect = inject<IBasicInfoInputProps, BasicInfoProps>(mergeProps((a:any) => a));

export const BasicInfo = connect(BasicInfoComponent);
