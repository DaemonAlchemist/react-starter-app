import { inject, mergeProps } from "unstateless";
import {PodInitializerComponent} from "./PodInitializer.component";
import {IPodInitializerInputProps, PodInitializerProps} from "./PodInitializer.d";

const connect = inject<IPodInitializerInputProps, PodInitializerProps>(mergeProps((a:any) => a));

export const PodInitializer = connect(PodInitializerComponent);
