import { inject, mergeProps } from "unstateless";
import {ImageComponent} from "./Image.component";
import {IImageInputProps, ImageProps} from "./Image.d";

const connect = inject<IImageInputProps, ImageProps>(mergeProps((a:any) => a));

export const Image = connect(ImageComponent);
