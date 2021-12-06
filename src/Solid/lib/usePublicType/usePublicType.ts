import { NamedNode } from 'rdflib';
import { Quad_Graph } from 'rdflib/lib/tf-types';
import * as React from 'react';
import { useLoader } from '../useLoader';
import { useProfile } from '../useProfile';
import { useRDF } from '../useRDF';
import { ns } from '../useRDF/useRDF.helpers';

type IndexType = "instance" | "instanceContainer" | null;

export const usePublicType = (webId:string, type:NamedNode):[NamedNode | null, IndexType, boolean] => {
    const rdf = useRDF();
    const profile = useProfile(webId);
    const loading = useLoader();

    const {store} = rdf.graph;
    const {solid} = ns;

    React.useEffect(() => {
        if(profile.publicTypes.length > 0) {
            const doc:Quad_Graph = profile.publicTypes[0] as Quad_Graph;

            const typeIndexUri = doc.value;
            loading.start();
            rdf.fetch(typeIndexUri).finally(loading.done);
        }
    }, [profile]);

    const [regNode, setRegNode] = React.useState<NamedNode | null>(null);
    const [nodeType, setNodeType] = React.useState<IndexType>(null);
    React.useEffect(() => {
        if(profile.publicTypes.length > 0) {
            const doc:Quad_Graph = profile.publicTypes[0] as Quad_Graph;

            const subjectMatches = store.match(null, solid("forClass"), type, doc);
            if(subjectMatches.length > 0) {
                const subject = subjectMatches[0].subject;
                const objectMatches = [
                    ...store.match(subject, solid("instance"), null, doc),
                    ...store.match(subject, solid("instanceContainer"), null, doc),
                ];
                if(objectMatches.length > 0) {
                    const obj = objectMatches[0].object;
                    setRegNode(obj as NamedNode);
                    setNodeType(obj.value[obj.value.length - 1] === "/" ? "instanceContainer" : "instance");
                }
            }
        }
    }, [profile, rdf.graph]);

    return [regNode, nodeType, loading.isLoading];
}