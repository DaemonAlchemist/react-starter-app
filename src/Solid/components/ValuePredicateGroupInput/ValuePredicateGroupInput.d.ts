import { NamedNode } from "rdflib";

// What gets passed into the component from the parent as attributes
export declare interface IValuePredicateGroupInputInputProps {
    subject: NamedNode | null;
    predicates: {
        [name:string]: NamedNode;
    }
}

export type ValuePredicateGroupInputProps = IValuePredicateGroupInputInputProps;