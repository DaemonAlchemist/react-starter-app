import { Quad_Object } from 'rdflib/lib/tf-types';
import { NamedNode } from 'rdflib';
import * as React from 'react';
import { ns, sym } from '../useRDF/useRDF.helpers';
import { prop } from 'ts-functional';
import { useRDF } from '../useRDF';
import { IProfile } from './useProfile.d';

export const useProfile = (newWebId:string) => {
    const rdf = useRDF();
    const {store} = rdf.graph;
    const [profile, setProfile] = React.useState<IProfile>({
        addresses: [], all: [], emails: [], fullName: [], images: [],
        inbox: [], name: [], phoneNumbers: [], prefs: [], privateTypes: [],
        publicTypes: [], roles: [], sameAs: [], seeAlso: [], storage: []
    });

    const {foaf, vcard, ldp, space, solid, owl, rdfs} = ns;

    const [webId, setWebId] = React.useState("");

    if(newWebId !== webId) {
        setWebId(newWebId);
    }

    React.useEffect(() => {
        if(webId) {
            rdf.fetch(webId);
        }
    }, [webId]);

    React.useEffect(() => {
        if(webId) {
            const match = (predicate?:NamedNode):Quad_Object[] =>
                store.match(sym(webId), predicate).map(prop<any, "object">("object"));

            const newProfile:IProfile = {
                addresses:    match(vcard("hasAddress")),
                all:          match(),
                emails:       match(vcard("hasEmail")),
                fullName:     match(vcard("fn")),
                images:       match(vcard("hasPhoto")),
                inbox:        match(ldp("inbox")),
                name:         match(foaf("name")),
                phoneNumbers: match(vcard("hasAddress")),
                prefs:        match(space("preferencesFile")),
                privateTypes: match(solid("privateTypeIndex")),
                publicTypes:  match(solid("publicTypeIndex")),
                roles:        match(vcard("role")),
                sameAs:       match(owl("sameAs")),
                seeAlso:      match(rdfs("seeAlso")),
                storage:      match(space("storage")),
            };

            if(JSON.stringify(newProfile) !== JSON.stringify(profile)) {
                if(JSON.stringify(newProfile.sameAs) !== JSON.stringify(profile.sameAs)) {
                    newProfile.sameAs.forEach((obj) => {fetch(obj.value);});
                }

                if(JSON.stringify(newProfile.seeAlso) !== JSON.stringify(profile.seeAlso)) {
                    newProfile.seeAlso.forEach((obj) => {fetch(obj.value);});
                }

                if(JSON.stringify(newProfile.prefs) !== JSON.stringify(profile.prefs)) {
                    newProfile.prefs.forEach((obj) => {fetch(obj.value);});
                }

                setProfile(newProfile);
            }
        }
    }, [rdf.graph, webId]);

    return profile;
}
