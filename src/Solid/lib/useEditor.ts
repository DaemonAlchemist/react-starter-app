import { Literal, NamedNode, st } from 'rdflib';
import * as React from 'react';
import { useLoader } from './useLoader';
import { useRDF } from './useRDF';

export const useEditor = (doc:NamedNode | null, subject:NamedNode | null, predicate:NamedNode):[string, (val:string) => void, boolean] => {
    const rdf = useRDF();
    const {store} = rdf.graph;
    const [val, setVal] = React.useState("");
    const loader = useLoader();

    const save = (n:string) => {
        if(doc && subject) {
            loader.start();
            rdf.update(
                store.match(subject, predicate, null, doc),
                [st(subject, predicate, new Literal(n), doc)]
            ).finally(loader.done);
        }
    }

    React.useEffect(() => {
        const matches = store.match(subject, predicate);
        if(matches.length > 0) {
            setVal(matches[0].object.value);
        }
    }, [rdf.graph]);

    return [val, save, loader.isLoading];
}
