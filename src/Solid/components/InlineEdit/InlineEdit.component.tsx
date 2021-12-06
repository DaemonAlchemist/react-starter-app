import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React from 'react';
import { InlineEditProps } from "./InlineEdit.d";
import './InlineEdit.scss';

export const InlineEditComponent = (props:InlineEditProps) => {
    const [curValue, setCurValue] = React.useState(props.value);
    const updateValue = (e:React.ChangeEvent<HTMLInputElement>) => {setCurValue(e.currentTarget.value);}

    const [isSaving, setIsSaving] = React.useState(false);
    const saveChanges = () => {
        setIsSaving(true);
        props.onSave(curValue).then(() => {
            setIsSaving(false);
        });
    }

    return props.editable ? <Input className="inline-edit"
        value={curValue}
        onChange={updateValue}
        onPressEnter={saveChanges}
        disabled={isSaving}
        suffix={isSaving ? <LoadingOutlined spin/> : <EditOutlined />}
    /> : <>{props.value}</>;
}
