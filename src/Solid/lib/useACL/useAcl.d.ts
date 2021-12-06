import { NamedNode } from "rdflib";

export interface IAuthorization {
    id: string;
    subject: string;
    aclUri: string;
    agents: NamedNode[];
    agentGroups: NamedNode[];
    accessTo: NamedNode[];
    agentClasses: NamedNode[];
    isDefault: boolean;
    modes: NamedNode[];
    baseUri: string;
    defaulted: boolean;
}

