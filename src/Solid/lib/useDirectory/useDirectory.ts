import { NamedNode } from 'rdflib';
import React, { useEffect } from 'react';
import { prop } from 'ts-functional';
import { a, ns, sym } from '../..';
import { useLoader } from '../useLoader';
import { useProfile } from '../useProfile';
import { useRDF } from '../useRDF';
import { Quad } from '../useRDF/useRDF.d';
import { useSession } from '../useSession';

export const useDirectory = (path:string):[NamedNode[], NamedNode[], string, boolean, () => void] => {
    const rdf = useRDF();
    const {store} = rdf.graph;
    const {ldp} = ns;
    const session = useSession();
    const profile = useProfile(session?.webId || "");

    const [directories, setDirectories] = React.useState<NamedNode[]>([]);
    const [files, setFiles] = React.useState<NamedNode[]>([]);

    const curDir:string | null = profile.storage.length > 0
        ? `${profile.storage[0].value}${path}/`.replace(/\/\/$/, "/")
        : null;

    React.useEffect(() => {
        if(curDir) {
            const entities:NamedNode[] = store.match(sym(curDir), ldp("contains"), null)
                .map(prop<any, "object">("object"))
                // Filter out metadata files.  This will go away when .meta files are officially supported by NSS and the Solid spec
                .filter((node:any) => !/\.extra\.ttl$/.test(node.value)) as NamedNode[];
            setDirectories(entities.filter(
                (entity:Quad) => store.match(entity, a, ldp("Container")).length > 0
            ));
            setFiles(entities.filter(
                (entity:Quad) => store.match(entity, a, ldp("Container")).length === 0
            ));
        }
    }, [rdf.graph]);


    const loader = useLoader();
    const refresh = () => {
        // Bug:  Make sure stuff doesn't get unloaded all the time.
        if(curDir) {
            loader.start();
            store.removeMatches(sym(curDir), ldp("contains"));
            rdf.fetch(curDir, {force: true}).finally(loader.done);
        }

    };
    useEffect(refresh, [curDir]);

    return [directories, files, curDir || "", loader.isLoading, refresh];
}