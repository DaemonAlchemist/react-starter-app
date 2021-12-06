import { PlusOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import * as React from 'react';
import { ns, ResourceSelector } from '../../../Solid';
import { AgentSelectProps } from "./AgentSelect.d";
import './AgentSelect.scss';

const {foaf, acl} = ns;

export const AgentSelectComponent = (props:AgentSelectProps) => {
    const onSelectAgent = (webId:string) => {
        hidePopup();
        props.onSelectAgent(webId);
    }

    const onSelectPublic = () => {
        hidePopup();
        props.onSelectAgentClass(foaf("Agent").value);
    }

    const onSelectLoggedIn = () => {
        hidePopup();
        props.onSelectAgentClass(acl("AuthenticatedAgent").value);
    }

    const [popupVisible, setPopupVisible] = React.useState(false);
    const showPopup = () => {setPopupVisible(true);}
    const hidePopup = () => {setPopupVisible(false);}

    return <>
        {popupVisible && <div className="agent-selector-popup">
            <ResourceSelector label="User or group" onSelect={onSelectAgent}/><br/>
            <Tag onClick={onSelectPublic}>Public</Tag>
            <Tag onClick={onSelectLoggedIn}>Logged-in Users</Tag>
        </div>}

        {typeof props.label !== 'undefined' ? props.label : "Visible to:"}
        {!props.inline && <br/>}
        {props.agents.length === 0 && <i>&nbsp;Nobody&nbsp;</i>}
        {props.agents.map((group:string) => <Tag key={group} closable>{group}</Tag>)}
        <PlusOutlined onClick={showPopup} />
    </>;
}
