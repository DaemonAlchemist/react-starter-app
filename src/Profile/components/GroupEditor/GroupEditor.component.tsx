import { CloseOutlined } from '@ant-design/icons';
import { Col, Popconfirm, Row, Spin, Typography } from 'antd';
import QRCode from 'qrcode.react';
import { UploadRequestOption } from 'rc-upload/lib/interface';
import * as rdfLib from 'rdflib';
import React, { useEffect } from 'react';
import { ns, Resource, ResourceSelector, sym, useRDF } from '../../../Solid';
import { DeleteSubjectButton } from '../../../Solid/components/DeleteSubjectButton';
import { ResourceDetail } from '../../../Solid/components/ResourceDetail';
import { useLoader } from '../../../Solid/lib/useLoader';
import { GroupEditorProps } from "./GroupEditor.d";
import './GroupEditor.scss';

export const GroupEditorComponent = (props:GroupEditorProps) => {
    const rdf = useRDF();
    const {store} = rdf.graph;
    const {vcard} = ns;

    const doc = props.group.doc();

    const loader = useLoader();
    useEffect(() => {
        loader.start();
        rdf.fetch(props.group.value).finally(loader.done);
    }, [props.group.value]);

    const addUser = (webId:string) => {
        loader.start();
        rdf.update([],[rdfLib.st(props.group, vcard("hasMember"), sym(webId) as rdfLib.NamedNode, doc)]).finally(loader.done);
    }

    const members = store.match(props.group, vcard("hasMember"), null);

    const removeMember = (member:rdfLib.NamedNode) => () => {
        loader.start();
        rdf.update([rdfLib.st(props.group, vcard("hasMember"), member, doc),], []).finally(loader.done);
    }

    // TODO:  Allow changing the group name and image
    const onChangeImage = (file:UploadRequestOption) => {
        console.log("New image");
        console.log(file);
        // TODO:  Find out what type file.data is, and how to transform for upload
        // TODO:  Figure out how I'm handling file uploads (should use the image publicType index)
        return Promise.resolve();
    }

    const onChangeName = (name:string) => {
        console.log("New name");
        console.log(name);
        loader.start();
        return rdf.update(
            store.statementsMatching(props.group, vcard("fn"), null, doc),
            [rdfLib.st(props.group, vcard("fn"), new rdfLib.Literal(name), doc)]
        ).finally(loader.done);
    }

    return <Spin spinning={loader.isLoading}>
        <div style={{position: "absolute", right: 0}}>
            <DeleteSubjectButton subject={props.group} doc={doc}>
                <CloseOutlined /> Delete the&nbsp;<b><Resource webId={props.group.value} noImage noPopup /></b> group
            </DeleteSubjectButton>
        </div>

        <div className="qr-code"><QRCode value={props.group.value} /></div>

        <h1>
            <ResourceDetail webId={props.group.value} editable onChangeImage={onChangeImage} onChangeName={onChangeName} />
        </h1>

        <hr style={{clear: "both"}}/>
        <Row>
            <Col xs={{offset: 4, span: 16}}>
                <Spin spinning={loader.isLoading}>
                    <ResourceSelector label={`Add someone to this group`} onSelect={addUser} />
                </Spin>
            </Col>
        </Row>
        <Row>
            <Col xs={24} className="group-member-list">
                {members.map((member:any) => <span key={member.object.value} className="group-member">
                    <Resource key={member.object.value} webId={member.object.value} />
                    <Popconfirm
                        title="Are you sure you want to remove this group member?"
                        okText="Remove"
                        cancelText="Keep"
                        onConfirm={removeMember(member.object as rdfLib.NamedNode)}
                    >
                        <Typography.Text type="danger"><CloseOutlined className="remove-btn" /></Typography.Text>
                    </Popconfirm>
                </span>)}
            </Col>
        </Row>
    </Spin>;
}
