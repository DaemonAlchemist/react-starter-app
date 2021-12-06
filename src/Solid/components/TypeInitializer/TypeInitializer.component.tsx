import { ApiOutlined, LoadingOutlined, WarningOutlined } from '@ant-design/icons';
import { Alert, Button, message, Spin } from 'antd';
import * as rdfLib from 'rdflib';
import * as React from 'react';
import { ns, sym, usePublicType, useRDF, useSession } from '../..';
import { useLoader } from '../../lib/useLoader';
import { useProfile } from '../../lib/useProfile';
import { a, updater } from '../../lib/useRDF/useRDF.helpers';
import { TypeInitializerProps } from "./TypeInitializer.d";
import './TypeInitializer.scss';

export const TypeInitializerComponent = (props:TypeInitializerProps) => {
    const session = useSession();
    const rdf = useRDF();
    const {solid} = ns;
    const [regNode, _, isTypeLoading] = usePublicType(session?.webId || "", props.type);
    const profile = useProfile(session?.webId || "");

    const isFile = /\.ttl/.test(props.defaultLocation);
    const isContainer = props.defaultLocation[props.defaultLocation.length - 1] === "/";

    if(!isFile && !isContainer) {
        throw new Error("Error:  TypeInitializer:defaultLocation MUST be either an index file (.ttl) or a container location (ending in a /)");
    }

    const loader = useLoader();
    const initialize = () => {
        loader.start();
        // Get the user's storage location
        const storage = profile.storage;
        if(storage.length === 0) {
            // Bail out if not found
            message.error("Could not determine where your pod stores things.");
            loader.done();
            return;
        }

        // TODO:  Check if the publicTypeIndex file exists.  For now, we're assuming everyone has one.

        const doc = profile.publicTypes[0] as rdfLib.NamedNode;
        const subject = sym(`${doc.value}#${props.name}`);
        const typeIndex = sym(`${profile.storage[0].value}${props.defaultLocation}`);

        if(!!subject && !!typeIndex) {
            if(isFile) {
                // Create the type file
                updater.put(typeIndex, "", "text/turtle", (typeFileUri, typeFileCreateSuccess, typeFileCreateErr, typeFileCreateResponse) => {
                    // Add the type file to the public type index
                    rdf.update([], [
                        rdfLib.st(subject, a,                 solid('TypeRegistration'), doc),
                        rdfLib.st(subject, solid("forClass"), props.type,                doc),
                        rdfLib.st(subject, solid("instance"), typeIndex,                 doc),
                    ], (typeIndexFileUri, indexUpdateSuccess, indexUpdateErr, indexUpdateResponse) => {
                        loader.done();
                    });
                });
            } else {
                //  Add the type container to the public type index
                rdf.update([], [
                    rdfLib.st(subject, a,                          solid('TypeRegistration'), doc),
                    rdfLib.st(subject, solid("forClass"),          props.type,                doc),
                    rdfLib.st(subject, solid("instanceContainer"), typeIndex,                 doc),
                ], (typeIndexFileUri, indexUpdateSuccess, indexUpdateErr, indexUpdateResponse) => {
                    loader.done();
                });
            }
        }
    }

    return <>
        {isTypeLoading && !regNode && <><LoadingOutlined /> Finding your {props.name}...</>}
        <div style={{display: !isTypeLoading && !regNode ? "block" : "none", textAlign: "center"}}>
            <Spin spinning={loader.isLoading} tip={`Creating a place for your ${props.name}`}>
                <Alert type="error" message={<>
                    <WarningOutlined /> Your Pod does not have a place for <b>{props.name}</b>.<br/><br/>
                    <Button onClick={initialize}><ApiOutlined /> Make a place for your&nbsp;<b>{props.name}</b></Button>
                </>} />
            </Spin>
        </div>
    </>;
}
