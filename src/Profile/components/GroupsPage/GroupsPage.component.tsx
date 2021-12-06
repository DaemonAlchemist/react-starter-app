import { TeamOutlined } from '@ant-design/icons';
import { Col, Row, Spin, Tabs } from 'antd';
import * as rdfLib from 'rdflib';
import * as React from 'react';
import { a, ns, Resource, usePublicType, useRDF, useSession } from '../../../Solid';
import { TypeInitializer } from '../../../Solid/components/TypeInitializer';
import { useResource } from '../../../Solid/lib/useResource';
import { GroupCreateForm } from '../GroupCreateForm';
import { GroupEditor } from '../GroupEditor';
import { GroupsPageProps } from "./GroupsPage.d";
import './GroupsPage.scss';

export const GroupsPageComponent = (props:GroupsPageProps) => {
    const session = useSession();
    const rdf = useRDF();
    const {store} = rdf.graph;
    const {vcard} = ns;
    const type = vcard("Group");
    const [doc, indexType, isTypeLoading] = usePublicType(session?.webId || "", type);

    // TODO: Handle instanceContainer indexType
    const refreshType = useResource(doc?.value);

    const groups = store.match(null, a, type, doc as rdfLib.NamedNode);

    return <Row>
        <Col xs={24}>
            <h1><TeamOutlined /> Groups</h1>
        </Col>
        
        <Col xs={{offset: 8, span: 8}}>
            <TypeInitializer name="Groups" type={type} defaultLocation="groups/index.ttl"/>
            <GroupCreateForm />
        </Col>

        <Col xs={24}>
            <hr/>
            <Spin spinning={isTypeLoading} size="large" tip="Loading groups...">
                <Tabs tabPosition="left">
                    {groups.map((group:any) =>
                        <Tabs.TabPane className="group-editor" key={group.subject.value} tab={<Resource webId={group.subject.value} />}>
                            <GroupEditor group={group.subject as rdfLib.NamedNode} />
                        </Tabs.TabPane>
                    )}
                </Tabs>
            </Spin>
        </Col>
    </Row>;
}
