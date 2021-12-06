import { NamedNode } from 'rdflib';
import React, { useEffect } from 'react';
import { unique } from 'ts-functional';
import { a, sym } from '..';
import { useLoader } from './useLoader';
import { useRDF } from './useRDF';

export const useTypes = (uri?:string):[string[], boolean] => {
    const rdf = useRDF();
    const {store} = rdf.graph;

    const loader = useLoader();
    useEffect(() => {
        loader.start();
        rdf.fetch(uri).finally(loader.done);
    }, [uri]);

    const [types, setTypes] = React.useState<string[]>([]);
    React.useEffect(() => {
        const newTypes:string[] = unique(store.match(sym(uri || "") as NamedNode, a)
            .map((n:any) => n.object.value)
            .filter((u:string) => ![
                "http://www.w3.org/2007/ont/link#Document", // Everything is a document, don't need to show this.
                "http://www.w3.org/ns/ldp#Resource",        // Everything is a resource, don't need to show this.
            ].includes(u))
        );
        if(JSON.stringify(newTypes) !== JSON.stringify(types)) {setTypes(newTypes);}
    }, [rdf.graph]);

    return [types, loader.isLoading];
}