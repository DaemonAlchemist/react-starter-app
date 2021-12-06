import { CloseOutlined, ContactsOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Input, Row, Typography } from 'antd';
import * as React from 'react';
import { useSession } from '../../../Solid';
import { useProfile } from '../../../Solid/lib/useProfile';
import { AgentSelect } from '../AgentSelect';
import './ContactsPage.scss';
import { ContactsPageProps } from "./ContactsPage.d";
import { WIP } from '../../../Solid/components/WIP';

const contacts = [
    {name: "Andrea Gell", webId: "https://someone.inrupt.com/profile/card#me", inGroups: ["Family"], visibleTo: ["Family", "Friends"]},
    {name: "Amber Gell", webId: "https://someone.inrupt.com/profile/card#me", inGroups: ["Family"], visibleTo: ["Family"]},
    {name: "Sherry Kros", webId: "https://someone.inrupt.com/profile/card#me", inGroups: ["Family"], visibleTo: ["Family"]},
    {name: "John Doe", webId: "https://someone.inrupt.com/profile/card#me", inGroups: ["Friends", "Work"], visibleTo: ["Friends", "Family"]},
    {name: "Boss Man", webId: "https://someone.inrupt.com/profile/card#me", inGroups: ["Work"], visibleTo: ["Work", "Friends", "Family"]},
    {name: "Jane Doe", webId: "https://someone.inrupt.com/profile/card#me", inGroups: ["Mistresses"], visibleTo: []},
]

const doNothing = () => {/*do nothing*/}

export const ContactsPageComponent = (props:ContactsPageProps) => {
    const session = useSession();
    const profile = useProfile(session?.webId || "");

    return <Row>
        <Col xs={24}>
            <WIP />
            <h1><ContactsOutlined /> Contacts</h1>
            {JSON.stringify(profile.publicTypes)}
        </Col>
        <Col xs={{offset: 6, span: 12}}>
            <Input
                addonBefore="Add a new contact"
                placeholder="WebID..."
                addonAfter={<span className="add-btn"><PlusOutlined /></span>}
            />
        </Col>
        <Col xs={24}>
            <table style={{width: "100%"}}>
                <thead>
                    <tr>
                        <th/>
                        <th>Belongs to</th>
                        <th>Visible to</th>
                        <th style={{width: "20px"}}/>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact) =>
                        <tr key={contact.name}>
                            <td style={{whiteSpace: "nowrap"}}>
                                <img src="https://picsum.photos/64/64" style={{float: "left", width: "64px", height: "64px"}} alt=""/>
                                <b>{contact.name}</b><br/>
                                <em>{contact.webId}</em>
                            </td>
                            <td><AgentSelect agents={contact.inGroups} agentClasses={[]} onSelectAgent={doNothing} onSelectAgentClass={doNothing} label="" /></td>
                            <td><AgentSelect agents={contact.visibleTo} agentClasses={[]} onSelectAgent={doNothing} onSelectAgentClass={doNothing} label="" /></td>
                            <td><Typography.Text type="danger"><CloseOutlined /></Typography.Text></td>
                        </tr>
                    )}
                </tbody>
            </table>

        </Col>
    </Row>;
}
