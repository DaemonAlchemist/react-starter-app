import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import React from 'react';
import { useFileClient } from '../../lib/useFileClient';
import { UploadButtonProps } from "./UploadButton.d";
import './UploadButton.scss';

export const UploadButtonComponent = (props:UploadButtonProps) => {
    const client = useFileClient();

    const uploadFile = (file:UploadRequestOption) => {
        const data = file.file as RcFile;
        const fileUri = `${props.directory}${data.name}`.replace(/ /g, "%20");
        client.put(fileUri, data)
            .then(props.onSuccess, props.onFailure);
    }

    return <Upload customRequest={uploadFile} showUploadList={false} disabled={client.isLoading}>
        <Button type="link" size='small'>
            {client.isLoading ? <LoadingOutlined spin /> : <UploadOutlined />}
            Upload...
        </Button>
    </Upload>;
}