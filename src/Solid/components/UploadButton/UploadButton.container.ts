import { inject, mergeProps } from "unstateless";
import {UploadButtonComponent} from "./UploadButton.component";
import {IUploadButtonInputProps, UploadButtonProps} from "./UploadButton.d";

const connect = inject<IUploadButtonInputProps, UploadButtonProps>(mergeProps((a:any) => a));

export const UploadButton = connect(UploadButtonComponent);
