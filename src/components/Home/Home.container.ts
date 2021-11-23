import { inject, mergeProps } from "unstateless";
import { HomeComponent } from "./Home.component";
import { HomeProps, IHomeInputProps } from "./Home.d";

const connect = inject<IHomeInputProps, HomeProps>(mergeProps((a:any) => a));

export const Home = connect(HomeComponent);
