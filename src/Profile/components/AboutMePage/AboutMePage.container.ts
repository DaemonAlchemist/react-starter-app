import { inject, mergeProps } from "unstateless";
import {AboutMePageComponent} from "./AboutMePage.component";
import {IAboutMePageInputProps, AboutMePageProps} from "./AboutMePage.d";

const connect = inject<IAboutMePageInputProps, AboutMePageProps>(mergeProps((a:any) => a));

export const AboutMePage = connect(AboutMePageComponent);
