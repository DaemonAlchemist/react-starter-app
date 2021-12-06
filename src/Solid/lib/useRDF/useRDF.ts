import { debounce } from 'debounce';
import { NamedNode } from 'rdflib';
import { useCallback } from 'react';
import { useSharedState as ss } from 'unstateless';
import { useLoader } from '../useLoader';
import { getParentDir } from '../util';
import { IGraphContext, IUseRdf, IuseRDFOptions, Quad, Updater } from './useRDF.d';
import { fetcher, store, updater } from './useRDF.helpers';

const debug = true;

const useGraph = ss<IGraphContext>({store});

export const useRDF = ({timeout = 10000}:IuseRDFOptions = {}):IUseRdf => {
    // Note: Using a debounced setter since multiple RDF graph
    //       updates in quick succession can be extremely slow
    const [graph, _setGraph] = useGraph();
    const setGraph = debounce(_setGraph, 200);

    const fetchAclUri = useCallback((uri?:string, options?:any):Promise<string> => {
        if(!uri) {return Promise.resolve("");}
        if(debug) {console.log(`Starting ACL Fetch for ${uri}`);}
        return fetcher
            .load(store.sym(uri).doc(), options)
            .then((response) => {
                if(debug) {console.log(`Completed ACL fetch for ${uri}`);}
                setGraph({store});
    
                // Parse the links header to find the ACL file location
                const links = response.headers.get("link") || "";
                const aclRel:{acl: string} = links.split(",").reduce((l:{acl: string}, curLink) => {
                    const [linkRaw, relRaw] = curLink.split(";");
                    const link = linkRaw.trim().replace(/[<>]/g, "");
                    const rel = relRaw.trim().replace(/rel=/, "").replace(/"/g, "");
                    return {...l, [rel]: link}
                }, {acl: ""});
    
                // Get the absolute URI for the ACL file
                const aclUri = new URL(aclRel.acl, uri).href;
    
                // Return the ACL file URI
                return aclUri;
            }).catch((err) => {
                return "";
            });
    }, [setGraph]);

    const fetchAcl = (curUri?:string, finalAclUri?:string):Promise<string> => new Promise((resolve, reject) => {
        if(!!curUri) {
            if(debug){console.log(`Fetching ACL URI for ${curUri}`);}
            fetchAclUri(curUri).then((aclUri:string) => {
                if(debug){console.log(`Found ACL URI for ${curUri}: ${aclUri}`);}
                const parent = getParentDir(curUri);
                if(debug){console.log(`Parent: ${parent}`);}
                const valid = parent !== "https://" && parent !== "http://";
                fetch(aclUri)
                    .then(
                        () => {
                            if(debug){console.log(`Found ACL file for ${curUri}`);}
                            // We found this file's ACL, but still need to load the parent ACL files for consistency purposes
                            if(valid) {
                                fetchAcl(parent, finalAclUri || aclUri).then(resolve);
                            } else {
                                resolve(finalAclUri || aclUri);
                            }
                        },
                        (err:any) => {
                            if(debug){console.log(`Didn't find ACL file for ${curUri}`);}
                            // This file's ACL file does not exist, load the parent's ACL file
                            if(valid) {
                                fetchAcl(parent, finalAclUri).then(resolve);
                            } else {
                                resolve(finalAclUri || "");
                            }
                        }
                    );
            });
        } else {
            resolve("");
        }
    });

    const fetch = useCallback((uri?:string, options?:any):Promise<void> => {
        if(!uri) {return Promise.resolve();}
        if(debug) {console.log(`Starting fetch for ${uri}`);}
        return fetcher
            .load(store.sym(uri).doc(), options)
            .then((response) => {
                if(debug) {console.log(`Completing fetch for ${uri}`);}
                setGraph({store});
            }).catch((err) => {
                if(debug) {console.log(`Fetch failed for ${uri}`);}
                throw err;
            });
    }, [setGraph]);
    
    const update:Updater = useCallback((
        deletions: Quad[],
        insertions: Quad[],
        callback?: (uri: string | undefined | null, success: boolean, errorBody?: string, response?: Response | Error) => void
    ) => new Promise<Response | Error | undefined>((resolve, reject) => {
        const callBackWrapper = (uri: string | undefined | null, success: boolean, errorBody?: string, response?: Response | Error) => {
            if(debug) {console.log(`Completed update at ${uri}`);}
            setGraph({store});
            if(callback) {
                callback(uri, success, errorBody, response);
            }
            success ? resolve(response) : reject(errorBody);
        }
        updater.update(deletions, insertions, callBackWrapper);
    }), [setGraph]);
    
    const create = (doc: NamedNode, content: string | Quad[], contentType: string):Promise<void> => 
        updater.put(doc, content, contentType, () => {});

    const useUpdater = () => {
        const loader = useLoader();

        const loadingUpdater = (
            deletions: Quad[],
            insertions: Quad[],
            callback?: (uri: string | undefined | null, success: boolean, errorBody?: string, response?: Response | Error) => void
        ):Promise<Response | Error | undefined> => {
            loader.start();
            return update(deletions, insertions, callback).finally(loader.done);
        }

        return {isUpdating: loader.isLoading, update: loadingUpdater};
    }

    return {graph, fetchAclUri, fetch, update, fetchAcl, create, useUpdater};
}