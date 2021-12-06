import { inject, mergeProps } from "unstateless";
import {PicturesPageComponent} from "./PicturesPage.component";
import {IPicturesPageInputProps, PicturesPageProps} from "./PicturesPage.d";

const connect = inject<IPicturesPageInputProps, PicturesPageProps>(mergeProps((a:any) => a));

export const PicturesPage = connect(PicturesPageComponent);
