import { NamedNode } from 'rdflib';
import * as React from 'react';
import { prop } from 'ts-functional';
import { ns, sym } from '../..';
import { useRDF } from '../useRDF/useRDF';
import { Quad } from '../useRDF/useRDF.d';
import { getParentDir } from '../util';
import { IAuthorization } from './useAcl.d';

export const useACL = (uri:string):[IAuthorization[], boolean, () => void] => {
    const rdf = useRDF();
    const {store} = rdf.graph;
    const {acl} = ns;

    const [refreshTrigger, setRefreshTrigger] = React.useState(false);
    const refresh = () => {setRefreshTrigger(!refreshTrigger);}

    // Note:  This recursive algorithm is guaranteed to terminate since Solid servers MUST have a default ACL file at the root.
    const [baseUri, setBaseUri] = React.useState(uri);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        rdf.fetchAcl(uri).then((b:string) => {
            setBaseUri(b);
            setIsLoading(false);
        });
    }, [uri, refreshTrigger]);

    const [permissions, setPermissions] = React.useState<IAuthorization[]>([]);
    React.useEffect(() => {
        let auth:Quad[] = [];
        if(!!uri) {
            auth = store.match(null, acl("accessTo"), sym(uri));
            let cur = uri;
            while(auth.length === 0 && cur !== "https://" && cur !== "http:/") {
                cur = getParentDir(cur);
                auth = store.match(null, acl("default"), sym(cur));
            }
        }

        if(auth.length > 0) {
            const defaulted = auth[0].predicate.value === acl("default").value;
            const aclUri = auth[0].graph.value;
            const subjects = auth.map(prop("subject"));
            setPermissions(subjects.map(
                (subject:NamedNode):IAuthorization => ({
                    accessTo: store.match(subject, acl("accessTo")).map(prop<Quad, "object">("object")),
                    aclUri,
                    agentClasses: store.match(subject, acl("agentClass")).map(prop<Quad, "object">("object")),
                    agentGroups: store.match(subject, acl("agentGroup")).map(prop<Quad, "object">("object")),
                    agents: store.match(subject, acl("agent")).map(prop<Quad, "object">("object")),
                    baseUri,
                    defaulted,
                    id: subject.value.replace(`${aclUri}#`, ""),
                    isDefault: store.match(subject, acl("default"), sym(uri)).length > 0,
                    modes: store.match(subject, acl("mode")).map(prop<Quad, "object">("object")),
                    subject: subject.value,
                })
            ));
        }
    }, [rdf.graph, baseUri, refreshTrigger]);

    return [permissions, isLoading, refresh];
}
