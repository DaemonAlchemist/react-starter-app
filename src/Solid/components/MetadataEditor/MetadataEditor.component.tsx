import { Spin, Tabs } from 'antd';
import { NamedNode } from 'rdflib';
import React, { useEffect } from 'react';
import { last } from 'ts-functional';
import { sym, useRDF } from '../..';
import { useLoader } from '../../lib/useLoader';
import { useMeta } from '../../lib/useMeta';
import { updater } from '../../lib/useRDF/useRDF.helpers';
import { useRegisteredEditors } from '../../lib/useRegisteredEditors';
import { useTypes } from '../../lib/useTypes';
import { MetadataEditorProps } from "./MetadataEditor.d";
import './MetadataEditor.scss';

export const MetadataEditorComponent = (props:MetadataEditorProps) => {
    const [types, areTypesLoading] = useTypes(props.file);
    const rdf = useRDF();
    const [metaUri, isLoadingMetaUri] = useMeta(props.file);

    const loadingMetaData = useLoader();
    useEffect(() => {
        loadingMetaData.start();
        if(metaUri) {
            rdf.fetch(metaUri)
            .catch(() => updater.put(sym(metaUri) as NamedNode, "", "text/turtle", () => {}))
            .finally(loadingMetaData.done);
        }
    }, [metaUri]);

    const editors = useRegisteredEditors(types);

    return <Spin spinning={areTypesLoading || isLoadingMetaUri || loadingMetaData.isLoading}>
        <h4>{(last(props.file.split("/")) || "").replace(/\%20/g, " ")}</h4>
        <hr />
        <Tabs tabPosition="left">
            {editors.map(({name, Editor}, i) =>
                <Tabs.TabPane key={`${i}`} tab={name}>
                    <Editor subject={sym(props.file) as NamedNode}/>
                </Tabs.TabPane>
            )}
        </Tabs>
    </Spin>;
}
