import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import * as React from 'react';
import { useFileClient } from '../../lib/useFileClient';
import { useInput } from '../../lib/useInput';
import { DirectoryCreateFormProps } from "./DirectoryCreateForm.d";
import './DirectoryCreateForm.scss';

export const DirectoryCreateFormComponent = (props:DirectoryCreateFormProps) => {
    const client = useFileClient();
    const name = useInput("");

    const create = () => {
        client.createDirectory(`${props.parent}${name.value}`).then(() => {
            name.clear();
            if(props.onCreate) {props.onCreate();}
        })
    }

    return <Input
        placeholder="New directory"
        value={name.value}
        addonAfter={client.isLoading ? <LoadingOutlined spin /> : <PlusOutlined onClick={create} />}
        onChange={name.onChange}
        disabled={client.isLoading}
        onPressEnter={create}
    />;
}
