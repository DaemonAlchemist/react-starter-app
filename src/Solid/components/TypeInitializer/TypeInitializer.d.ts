import { NamedNode } from "rdflib";

// What gets passed into the component from the parent as attributes
export declare interface ITypeInitializerInputProps {
    name: string;
    type: NamedNode;
    defaultLocation: string;
}

export type TypeInitializerProps = ITypeInitializerInputProps;