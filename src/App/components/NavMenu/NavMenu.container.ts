import { inject, mergeProps } from "unstateless";
import {NavMenuComponent} from "./NavMenu.component";
import {INavMenuInputProps, NavMenuProps} from "./NavMenu.d";

const connect = inject<INavMenuInputProps, NavMenuProps>(mergeProps((a:any) => a));

export const NavMenu = connect(NavMenuComponent);
