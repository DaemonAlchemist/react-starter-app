import { inject, mergeProps } from "unstateless";
import {GroupsPageComponent} from "./GroupsPage.component";
import {IGroupsPageInputProps, GroupsPageProps} from "./GroupsPage.d";

const connect = inject<IGroupsPageInputProps, GroupsPageProps>(mergeProps((a:any) => a));

export const GroupsPage = connect(GroupsPageComponent);
