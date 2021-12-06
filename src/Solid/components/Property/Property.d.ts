import { NamedNode } from "rdflib";

// What gets passed into the component from the parent as attributes
export declare interface IPropertyInputProps {
    subject: NamedNode | null;
    property: NamedNode;
    editable?: boolean;
    onChange?: (value:string) => Promise<any>;
    defaultValue?: string;
}

export type PropertyProps = IPropertyInputProps;