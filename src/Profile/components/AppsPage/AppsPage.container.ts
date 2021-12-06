import { inject, mergeProps } from "unstateless";
import {AppsPageComponent} from "./AppsPage.component";
import {IAppsPageInputProps, AppsPageProps} from "./AppsPage.d";

const connect = inject<IAppsPageInputProps, AppsPageProps>(mergeProps((a:any) => a));

export const AppsPage = connect(AppsPageComponent);
