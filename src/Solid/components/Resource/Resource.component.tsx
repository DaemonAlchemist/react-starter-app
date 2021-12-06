import { CloseOutlined, InfoCircleOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Popconfirm, Spin, Tooltip, Typography } from 'antd';
import QRCode from 'qrcode.react';
import React, { useEffect } from 'react';
import { ns, sym } from '../../../Solid';
import { useLoader } from '../../lib/useLoader';
import { useRDF } from '../../lib/useRDF';
import { Picture } from '../Picture';
import { Property } from '../Property';
import { ResourceProps } from "./Resource.d";
import './Resource.scss';

export const ResourceComponent = (props:ResourceProps) => {
    const rdf = useRDF();
    const {vcard} = ns;
    const loader = useLoader();

    useEffect(() => {
        if(props.webId.indexOf("http") === 0) {
            loader.start();
            rdf.fetch(props.webId).finally(loader.done);
        }
    }, [props.webId]);

    let subject = null;
    try {
        subject = sym(props.webId);
    } catch(e) {
        return <em>Invalid webId</em>;
    }

    const remove = () => {
        if(props.onDelete) {
            props.onDelete(props.webId);
        }
    }

    if(props.webId.indexOf("mailto:") === 0) {
        return <span className={`resource-container ${props.className}`}>
            <MailOutlined /> <a href={props.webId}>{props.webId.substr(7)}</a>
            {!!props.onDelete && <Popconfirm title="Are you sure you want to remove this?" onConfirm={remove}>
                <Typography.Text type="danger"><CloseOutlined /></Typography.Text>
            </Popconfirm>}
        </span>;
    }

    const image = <Picture subject={subject}><UserOutlined /></Picture>;
    const name = <Property subject={subject} property={vcard("fn")} defaultValue={props.webId} />;
    const popupName = <Property subject={subject} property={vcard("fn")} />;

    return <span className={`resource-container ${props.className}`}>
        <Spin spinning={loader.isLoading} wrapperClassName="resource-spinner">
            {!props.noImage && image}&nbsp;
            {name}&nbsp;
            {!props.noPopup && <Tooltip
                title={<>
                    <div className="resource-qr-code">
                        <QRCode value={props.webId} />
                    </div>
                    {image} {popupName}<br/>
                    {props.webId}
                </>}
                overlayClassName="resource-info"
            >
                <InfoCircleOutlined />
            </Tooltip>}
            {!!props.onDelete && <Popconfirm title="Are you sure you want to remove this?" onConfirm={remove}>
                <Typography.Text type="danger"><CloseOutlined /></Typography.Text>
            </Popconfirm>}
        </Spin>
    </span>;
}
