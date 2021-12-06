import { LockOutlined, PlusOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
import * as rdfLib from 'rdflib';
import * as React from 'react';
import { last } from 'ts-functional';
import { v1 as uuid } from 'uuid';
import { a, ns, sym, useRDF, useSession } from '../..';
import { AclModes } from '../../lib/getAclMode';
import { IAuthorization } from '../../lib/useACL/useAcl.d';
import { useACL } from '../../lib/useACL/useACL';
import { useFileClient } from '../../lib/useFileClient';
import { useLoader } from '../../lib/useLoader';
import { AclModeSelector } from '../AclModeSelector';
import { Auth } from '../Auth';
import { IMode } from '../Mode/Mode';
import { PermissionsProps } from "./Permissions.d";
import './Permissions.scss';

export const PermissionsComponent = (props:PermissionsProps) => {
    const session = useSession();
    const client = useFileClient();
    const rdf = useRDF();

    const [auths, isLoading, refresh] = useACL(props.uri);
    const {store} = rdf.graph;
    const {acl} = ns;

    const defaultMode = last(AclModes) as IMode;
    const [curMode, setCurMode] = React.useState<IMode>(defaultMode);

    const loader = useLoader();

    const addAuthGroup = (mode:IMode) => {
        setCurMode(mode);
        loader.start();
        rdf.fetchAclUri(props.uri).then((aclUri:string) => {
            const doc = sym(aclUri) as rdfLib.NamedNode;
            const subject = sym(`${aclUri}#${uuid()}`) as rdfLib.NamedNode;
            return rdf.update([], [
                    rdfLib.st(subject, a,               acl("Authorization"),               doc),
                    rdfLib.st(subject, acl("accessTo"), sym(props.uri) as rdfLib.NamedNode, doc),
                ...mode.modes.map((m) =>
                    rdfLib.st(subject, acl("mode"),     acl(m),                             doc)
                )
            ]).then(() => {
                setCurMode(defaultMode);
            });
        }).finally(loader.done);
    }

    const overrideDefaultPermissions = () => {
        loader.start();
        rdf.fetchAclUri(props.uri).then((aclUri:string) => {
            const doc = sym(aclUri) as rdfLib.NamedNode;
            const subject = sym(`${aclUri}#${uuid()}`) as rdfLib.NamedNode;
            return rdf.update([], [
                rdfLib.st(subject, a,               acl("Authorization"),                          doc),
                rdfLib.st(subject, acl("accessTo"), sym(props.uri) as rdfLib.NamedNode,            doc),
                rdfLib.st(subject, acl("agent"),    sym(session?.webId || "") as rdfLib.NamedNode, doc),
                rdfLib.st(subject, acl("default"),  sym(props.uri) as rdfLib.NamedNode,            doc),
                rdfLib.st(subject, acl("mode"),     acl("Read"),                                   doc),
                rdfLib.st(subject, acl("mode"),     acl("Write"),                                  doc),
                rdfLib.st(subject, acl("mode"),     acl("Control"),                                doc),
            ]);
        }).finally(loader.done);
    }

    const removePermissionOverrides = () => {
        loader.start();
        rdf.fetchAclUri(props.uri).then((aclUri:string) => {
            const doc = sym(aclUri) as rdfLib.NamedNode;
            [...store.match(null, null, null, doc)].forEach((st) => {store.remove(st);});
            return client.delete(aclUri).then(() => {
                refresh();
            });
        }).finally(loader.done);
    }

    const isDefaulted = auths.length > 0 ? auths[0].defaulted : true;

    return <Spin spinning={isLoading || loader.isLoading}>
        <h4><LockOutlined /> Sharing</h4>
        <hr/>

        <div style={{textAlign: "center"}}>
            {isDefaulted && <Spin spinning={loader.isLoading}>
                <Button onClick={overrideDefaultPermissions}>
                    <UnlockOutlined /> Share this
                </Button>
            </Spin>}

            {!isDefaulted && <Spin spinning={loader.isLoading}>
                <Button onClick={removePermissionOverrides}>
                    <LockOutlined /> Stop sharing this
                </Button>
            </Spin>}
        </div>

        <hr/>

        {!isDefaulted && <Spin spinning={loader.isLoading}>
            <div style={{textAlign: "center"}}>
                <PlusOutlined /> Share with <AclModeSelector mode={curMode} onChange={addAuthGroup} />
            </div>
        </Spin>}

        {isDefaulted && <b>Default sharing permissions</b>}

        {auths.map((authRecord:IAuthorization) => <Auth key={authRecord.id} auth={authRecord} />)}
    </Spin>;
}
