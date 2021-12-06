import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Spin, Tooltip } from 'antd';
import React from 'react';
import { ns } from '../..';
import { useFileClient } from '../../lib/useFileClient';
import { useRDF } from '../../lib/useRDF';
import { useTypes } from '../../lib/useTypes';
import { Image } from '../Image';
import { TypeName } from '../TypeName';
import { FileProps } from "./File.d";
import './File.scss';

export const FileComponent = (props:FileProps) => {
    const client = useFileClient();

    const fileName = (props.node.value.split("/").pop() || "").replace(/\%20/g, " ");
    
    // const [isLoading] = useFetch(props.node.value, {method: "HEAD"});
    const [types, areTypesLoading] = useTypes(props.node.value);
    const rdf = useRDF();
    const {store} = rdf.graph;
    const {purl} = ns;

    const deleteFile = () => {
        client.delete(props.node.value).then(() => {
            if(props.onDelete) {
                store.removeMatches(props.node);
                store.removeMatches(null, null, props.node);
                props.onDelete(props.node.value);
            }
        })
    }

    const edit = () => {
        if(props.onEdit) {
            props.onEdit(props.node.value);
        }
    }

    return <Card className="file-card">
        <Spin spinning={client.isLoading || areTypesLoading}>
            <div className="file-delete-btn">
                <Popconfirm title="Are you sure you want to delete this file?" okText="Delete" cancelText="Keep" onConfirm={deleteFile}>
                    <Button shape="circle" icon={<CloseOutlined />} />
                </Popconfirm>
            </div>
            <Tooltip title={<>
                {types.map((name:string) => <TypeName key={name} name={name} />)}
            </>}>
                {types.includes(purl("Image").value)
                    ? <Image src={props.node.value} />
                    : <img src="/solid-logo.png" alt="" />
                }
                
                <p title={props.node.value}>{fileName}</p>
                <div className="file-edit-btn">
                    <Button shape="circle" type="default" icon={<EditOutlined />} onClick={edit} />
                </div>
            </Tooltip>
        </Spin>
    </Card>;
}
