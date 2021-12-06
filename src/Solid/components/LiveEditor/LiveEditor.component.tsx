import { Spin } from 'antd';
import * as React from 'react';
import { useEditor } from '../../lib/useEditor';
import { DebouncedInput } from '../DebouncedInput';
import { LiveEditorProps } from "./LiveEditor.d";
import './LiveEditor.scss';

export const LiveEditorComponent = (props:LiveEditorProps) => {
    const [val, save, isUpdating] = useEditor(props.doc, props.subject, props.predicate);

    return <Spin spinning={isUpdating}>
        <div style={{marginBottom: "8px"}}>
            <DebouncedInput textarea={props.textarea} addonBefore={props.label} timeout={1000} onChange={save} value={val} />
        </div>
    </Spin>;
}
