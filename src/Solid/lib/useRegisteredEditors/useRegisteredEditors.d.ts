import { NamedNode } from "rdflib";

export declare interface IRegisteredEditor {
    name: string | JSX.Element;
    Editor: ({subject:NamedNode}) => JSX.Element;
}

export declare type EditorRegistrator = (types:string[]) => IRegisteredEditor[];
