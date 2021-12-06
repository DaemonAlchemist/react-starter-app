import { NamedNode } from "rdflib";

// What gets passed into the component from the parent as attributes
export declare interface INamedNodeSelectInputProps {
    options: {[name:string]: NamedNode};
    values: NamedNode[];
    onChange: (node:NamedNode[]) => void;
}

export type NamedNodeSelectProps = INamedNodeSelectInputProps;