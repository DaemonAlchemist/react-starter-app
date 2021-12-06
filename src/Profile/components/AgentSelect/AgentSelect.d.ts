// What gets passed into the component from the parent as attributes
export declare interface IAgentSelectInputProps {
    agents: string[];
    agentClasses: string[];
    inline?: boolean;
    label?: string;
    onSelectAgent: (webId:string) => void;
    onSelectAgentClass: (webId:string) => void;
}

export type AgentSelectProps = IAgentSelectInputProps;