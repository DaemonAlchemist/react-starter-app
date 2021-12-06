import * as rdf from 'rdflib';
import { Quad_Subject } from 'rdflib/lib/tf-types';

// What gets passed into the component from the parent as attributes
export declare interface IDeleteSubjectButtonInputProps {
    children?: any;
    subject: Quad_Subject;
    doc: rdf.NamedNode;
}

export type DeleteSubjectButtonProps = IDeleteSubjectButtonInputProps;