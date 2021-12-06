import { CloseOutlined, LockOutlined, TeamOutlined } from '@ant-design/icons';
import { Button, Card, Popconfirm, Spin, Switch, Tooltip, Typography } from 'antd';
import { NamedNode, st } from 'rdflib';
import React from 'react';
import { a, ns, sym, useRDF, useSession } from '../..';
import { getAclMode } from '../../lib/getAclMode';
import { AclModeSelector } from '../AclModeSelector';
import { IMode } from '../Mode/Mode';
import { ResourceList } from '../ResourceList';
import { AuthProps } from "./Auth.d";
import './Auth.scss';

export const AuthComponent = (props:AuthProps) => {
    const session = useSession();
    const mode = getAclMode(props.auth.modes);
    const rdf = useRDF();
    const {store} = rdf.graph;
    const {acl, vcard} = ns;

    const subject = sym(props.auth.subject) as NamedNode;
    const doc = sym(props.auth.aclUri) as NamedNode;

    const defaultUpdater = rdf.useUpdater();
    const toggleDefault = (checked:boolean) => {
        defaultUpdater.update(
            !checked ? props.auth.accessTo.map((resource:NamedNode) => st(subject, acl("default"), resource, doc)) : [],
            checked  ? props.auth.accessTo.map((resource:NamedNode) => st(subject, acl("default"), resource, doc)) : [],
        );
    }

    const agentType = (webId:string):NamedNode => store.match(sym(webId), a, vcard("Group")).length > 0
        ? acl("agentGroup")
        : acl("agent");

    const agentAdder = rdf.useUpdater();
    const onAddAgent = (webId:string) => {
        agentAdder.update([], [st(subject, agentType(webId), sym(webId) as NamedNode, doc)]);
    }

    const agentDeleter = rdf.useUpdater();
    const onDeleteAgent = (webId:string) => {
        // TODO: If mode.name === "Owner" && webId === me, give a nice big scary warning.
        agentDeleter.update([st(subject, agentType(webId), sym(webId) as NamedNode, doc)], []);
    }

    const modeChanger = rdf.useUpdater();
    const onChangeMode = (newMode:IMode) => {
        // TODO: If mode.name === "Owner" && me is part of this auth, give a nice big scary warning.
        modeChanger.update(
               mode.modes.map((perm) => st(subject, acl("mode"), acl(perm), doc)),
            newMode.modes.map((perm) => st(subject, acl("mode"), acl(perm), doc)),
        );
    }

    const groupDeleter = rdf.useUpdater();
    const deleteAuthGroup = () => {
        groupDeleter.update(store.match(subject, null, null, doc), []);
    }

    const isOwnershipRecord = mode.name === "Owners" && (!session || props.auth.agents.length === 1 && props.auth.agents[0].value === session.webId);

    return isOwnershipRecord ? null : <Card
        className="permission-list"
        key={props.auth.id}
        title={<Spin spinning={modeChanger.isUpdating}>
            <AclModeSelector mode={mode} disabled={props.auth.defaulted} onChange={onChangeMode} />
        </Spin>}
        size="small"
        extra={
            props.auth.defaulted ? <em><Tooltip title={<>Inherited from:<br/>{props.auth.baseUri}</>}>default</Tooltip></em> :
            <Spin spinning={defaultUpdater.isUpdating || groupDeleter.isUpdating}>
                default: 
                <Tooltip title={`This WILL ${!props.auth.isDefault ? "NOT": ""} be inherited by things in this folder.`}>
                    <Switch checked={props.auth.isDefault} onChange={toggleDefault}/>
                </Tooltip>
                <Popconfirm title="Are you sure you want to stop sharing with this group?" onConfirm={deleteAuthGroup}>
                    <Button className="auth-delete-btn" shape="circle">
                        <Typography.Text type="danger"><CloseOutlined /></Typography.Text>
                    </Button>
                </Popconfirm>
            </Spin>
        }
    >
        {props.auth.agentClasses.map((cls:any) => <span key={cls.value} className='resource-container'>
            {cls.value === "http://xmlns.com/foaf/0.1/Agent" && <><TeamOutlined /> Everyone</>}
            {cls.value === "http://www.w3.org/ns/auth/acl#AuthenticatedAgent" && <><LockOutlined /> Logged-in users</>}
        </span>)}
        <Spin spinning={agentAdder.isUpdating || agentDeleter.isUpdating}>
            <ResourceList
                resources={[...props.auth.agents, ...props.auth.agentGroups]}
                onSelect={!props.auth.defaulted ? onAddAgent : undefined}
                onDelete={!props.auth.defaulted ? onDeleteAgent : undefined}
            />
        </Spin>
    </Card>;
}
