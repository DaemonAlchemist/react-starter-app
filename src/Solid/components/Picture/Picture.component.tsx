import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import React, { useEffect } from 'react';
import { ns } from '../../../Solid';
import { useRDF } from '../../../Solid/lib/useRDF';
import { useLoader } from '../../lib/useLoader';
import { PictureProps } from "./Picture.d";
import './Picture.scss';

export const PictureComponent = (props:PictureProps) => {
    const rdf = useRDF();
    const {store} = rdf.graph;
    const {vcard} = ns;

    const loader = useLoader();
    useEffect(() => {
        loader.start();
        if(props.subject?.value) {
            rdf.fetch(props.subject?.value).finally(loader.done);
        }
    }, [props.subject?.value]);

    const imgNode = store.any(props.subject, vcard("hasPhoto"));

    // TODO:  Handle the case where imgNode is an Image NamedNode rather than a Literal

    const contents = <>
        {!!imgNode && <img src={imgNode.value} style={{width: props.size || "32px"}} />}
        {!imgNode && <>{props.children}</>}
    </>;

    const [isUploading, setIsUploading] = React.useState(false);
    const upload = (file:UploadRequestOption) => {
        setIsUploading(true);
        if(props.onUpload) {
            props.onUpload(file).then(() => {
                setIsUploading(false);
            });
        }
    }

    return props.editable
        ? <Upload customRequest={upload} showUploadList={false}>
            <div className="upload-container">
                <div className="upload-overlay" style={{visibility: isUploading ? "visible" : undefined}}>
                    {!isUploading && <>
                        <UploadOutlined /><br/>
                        Upload...
                    </>}
                    {isUploading && <>
                        <LoadingOutlined spin/><br/>
                        Uploading...
                    </>}
                </div>
                {contents}
            </div>
        </Upload>
        : contents;
}
