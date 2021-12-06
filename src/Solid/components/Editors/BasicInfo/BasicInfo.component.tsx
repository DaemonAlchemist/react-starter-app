import { Spin } from 'antd';
import React from 'react';
import { ns, sym } from '../../..';
import { useMeta } from '../../../lib/useMeta';
import { LiveEditor } from '../../LiveEditor';
import { BasicInfoProps } from "./BasicInfo.d";
import './BasicInfo.scss';

export const BasicInfoComponent = (props:BasicInfoProps) => {
    const {vcard, schema} = ns;

    const [meta, isMetaLoading] = useMeta(props.subject.value);

    const subject = props.subject.value ? sym(props.subject.value) : null;
    const doc = meta ? sym(meta) : null;

    return <Spin spinning={isMetaLoading}>
        <LiveEditor doc={doc} subject={subject} predicate={vcard("fn")} label="Name" />
        <LiveEditor doc={doc} subject={subject} predicate={schema("description")} label="Description" textarea/>
    </Spin>;
}
