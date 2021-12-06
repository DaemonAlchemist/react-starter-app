import { inject, mergeProps } from "unstateless";
import {AgentSelectComponent} from "./AgentSelect.component";
import {IAgentSelectInputProps, AgentSelectProps} from "./AgentSelect.d";

const connect = inject<IAgentSelectInputProps, AgentSelectProps>(mergeProps((a:any) => a));

export const AgentSelect = connect(AgentSelectComponent);
