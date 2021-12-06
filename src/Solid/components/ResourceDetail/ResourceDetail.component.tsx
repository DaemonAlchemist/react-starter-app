import { UserOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React, { useEffect } from 'react';
import { ns, sym } from '../../../Solid';
import { useLoader } from '../../lib/useLoader';
import { useRDF } from '../../lib/useRDF';
import { Picture } from '../Picture';
import { Property } from '../Property';
import { ResourceDetailProps } from "./ResourceDetail.d";
import './ResourceDetail.scss';

export const ResourceDetailComponent = (props:ResourceDetailProps) => {
    const rdf = useRDF();
    const {vcard} = ns;

    const loader = useLoader();
    useEffect(() => {
        loader.start();
        rdf.fetch(props.webId).finally(loader.done);
    }, [props.webId]);

    let subject = null;
    try {
        subject = sym(props.webId);
    } catch(e) {
        return <em>Invalid webId</em>;
    }

    return <span className={`resource-detail-container ${props.className}`}>
        <Spin spinning={loader.isLoading} wrapperClassName="resource-spinner">
            <div style={{float: "left"}}>
                <Picture subject={subject} size="128px" editable={props.editable} onUpload={props.onChangeImage}>
                    <span className="img-placeholder"><UserOutlined /></span>
                </Picture>
            </div>
            <Property subject={subject} property={vcard("fn")} editable={props.editable} onChange={props.onChangeName} />
            <br/>
            <small><em>{props.webId}</em></small>
        </Spin>
    </span>;
}
