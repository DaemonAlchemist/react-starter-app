import * as rdf from 'rdflib';
import {Quad as RDFQuad} from 'rdflib';
import { Quad_Subject, Quad_Predicate, Quad_Object } from 'rdflib/lib/tf-types';

type NamespaceFunc = (type:string) => rdf.NamedNode;
export interface INamespaceIndex {
  [name:string]: NamespaceFunc;
}

export type UpdateCallback = (uri: string | undefined | null, success: boolean, errorBody?: string, response?: Response | Error) => void;

export type Updater = (
  deletions: Quad[],
  insertions: Quad[],
  callback?: UpdateCallback,
  secondTry?: boolean
) => Promise<Response | Error | undefined>;

export interface IGraphContext {
    store: rdf.Store;
  }

export interface IuseRDFOptions {
  timeout?: number;
}

export type Quad = RDFQuad<Quad_Subject, Quad_Predicate, Quad_Object>;

export interface IUseRdf {
    graph: IGraphContext;
    fetchAclUri: (uri?:string, options?:any) => Promise<string>;
    fetchAcl: (curUri?:string, finalAclUri?:string) => Promise<string>;
    fetch: (uri?:string, options?:any) => Promise<void>;
    update: (
        deletions: Quad[],
        insertions: Quad[],
        callback?: (uri: string | undefined | null, success: boolean, errorBody?: string, response?: Response | Error) => void
    ) => Promise<Response | Error | undefined>;
    useUpdater:() => {
        isUpdating: boolean;
        update: (deletions: Quad[], insertions: Quad[], callback?: ((uri: string | undefined | null, success: boolean, errorBody?: string | undefined, response?: Response | Error | undefined) => void) | undefined) => Promise<Response | Error | undefined>;
    };
    create: (doc: NamedNode, content: string | Quad[], contentType: string) => Promise<void>;
}