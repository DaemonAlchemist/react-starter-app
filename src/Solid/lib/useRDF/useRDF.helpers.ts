import { fetch as authnFetch } from "@inrupt/solid-client-authn-browser";
import * as rdf from 'rdflib';
import { Index } from 'ts-functional/dist/types';
import { INamespaceIndex } from './useRDF.d';

const namespaces:Index<string> = {
    acl:     "http://www.w3.org/ns/auth/acl#",
    arg:     "http://www.w3.org/ns/pim/arg#",
    cal:     "http://www.w3.org/2002/12/cal/ical#",
    contact: "http://www.w3.org/2000/10/swap/pim/contact#",
    dc:      "http://purl.org/dc/elements/1.1/",
    dct:     "https://www.w3.org/ns/auth/acl#",
    doap:    "http://usefulinc.com/ns/doap#",
    foaf:    "http://xmlns.com/foaf/0.1/",
    http:    "http://www.w3.org/2007/ont/http#",
    https:   "http://www.w3.org/2007/ont/httph#",
    icalTZ:  "http://www.w3.org/2002/12/cal/icaltzd#",
    ldp:     "http://www.w3.org/ns/ldp#",
    link:    "http://www.w3.org/2007/ont/link#",
    log:     "http://www.w3.org/2000/10/swap/log#",
    meeting: "http://www.w3.org/ns/pim/meeting#",
    mo:      "http://purl.org/ontology/mo/",
    owl:     "http://www.w3.org/2002/07/owl#",
    pad:     "http://www.w3.org/ns/pim/pad#",
    patch:   "http://www.w3.org/ns/pim/patch#",
    purl:    "http://purl.org/dc/terms/",
    qu:      "http://www.w3.org/2000/10/swap/pim/qif#",
    rdf:     "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    rdfs:    "http://www.w3.org/2000/01/rdf-schema#",
    rel:     "http://www.iana.org/assignments/link-relations/",
    rss:     "http://purl.org/rss/1.0/",
    sched:   "http://www.w3.org/ns/pim/schedule#",
    schema:  "http://schema.org/",
    sioc:    "http://rdfs.org/sioc/ns#",
    solid:   "http://www.w3.org/ns/solid/terms#",
    space:   "http://www.w3.org/ns/pim/space#",
    stat:    "http://www.w3.org/ns/posix/stat#",
    trip:    "http://www.w3.org/ns/pim/trip#",
    ui:      "http://www.w3.org/ns/ui#",
    vcard:   "http://www.w3.org/2006/vcard/ns#",
    wf:      "http://www.w3.org/2005/01/wf/flow#",
    xsd:     "http://www.w3.org/2001/XMLSchema#",
};

export const store = rdf.graph();

const makeNs = (prefix:string) => (type:string) => store.sym(`${prefix}${type}`);
export const ns:INamespaceIndex = Object.keys(namespaces).reduce(
    (index:INamespaceIndex, name: string) => ({
        ...index,
        [name]: makeNs(namespaces[name]),
    }),
    {}
);

const makeNsRaw = (prefix:string) => (type:string) => `${prefix}${type}`;
export const nsRaw:{[id:string]: (key:string) => string} = Object.keys(namespaces).reduce(
    (index:{[id:string]: (key:string) => string}, name: string) => ({
        ...index,
        [name]: makeNsRaw(namespaces[name]),
    }),
    {}
);

export const sym = (id:string):rdf.NamedNode | null => !!id ? store.sym(id) : null;

export const fetcher = rdf.fetcher(store, {fetch: authnFetch});
export const updater = new rdf.UpdateManager(store);

const r = "rdf";
export const a = ns[r]("type");
