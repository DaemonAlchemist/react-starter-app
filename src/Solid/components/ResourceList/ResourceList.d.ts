import { NamedNode } from "rdflib";

// What gets passed into the component from the parent as attributes
export declare interface IResourceListInputProps {
    resources: NamedNode[];
    onSelect?: (webId:string) => void;
    onDelete?: (webId:string) => void;
}

export type ResourceListProps = IResourceListInputProps;