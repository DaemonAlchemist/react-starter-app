import React, { useEffect } from 'react';
import { useRDF } from '../../../Solid/lib/useRDF';
import { InlineEdit } from '../InlineEdit';
import { PropertyProps } from "./Property.d";
import './Property.scss';

export const PropertyComponent = (props:PropertyProps) => {
    const rdf = useRDF();
    const {store} = rdf.graph;

    useEffect(() => {
        if(props.subject?.value) {
            rdf.fetch(props.subject?.value);
        }
    }, [props.subject?.value]);

    if(props.subject) {
        const nameNode = store.any(props.subject, props.property);
        const value = !!nameNode ? nameNode.value : (props.defaultValue || "");

        const save = props.onChange || ((v:string) => Promise.resolve());

        return <InlineEdit value={value} editable={props.editable} onSave={save} />;
    } else {
        return <></>;
    }
}
