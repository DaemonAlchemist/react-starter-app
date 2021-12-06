import { inject, mergeProps } from "unstateless";
import {PictureComponent} from "./Picture.component";
import {IPictureInputProps, PictureProps} from "./Picture.d";

const connect = inject<IPictureInputProps, PictureProps>(mergeProps((a:any) => a));

export const Picture = connect(PictureComponent);
