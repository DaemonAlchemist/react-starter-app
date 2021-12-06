import { EditOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Tag, Tooltip } from 'antd';
import React from 'react';
import { AclModes } from '../../lib/getAclMode';
import { IMode } from '../Mode/Mode';
import { AclModeSelectorProps } from "./AclModeSelector.d";
import './AclModeSelector.scss';

export const AclModeSelectorComponent = (props:AclModeSelectorProps) => {
    const onChange = (newMode:IMode) => () => {props.onChange(newMode);}

    return <>
        <Tooltip title={props.mode.description}>
            <Tag color={props.mode.color}>{props.mode.name}</Tag>
        </Tooltip>
        {!props.disabled && <Dropdown
            overlay={<Menu>
                {AclModes.filter((m) => m.name !== "Undefined").map((m) =>
                    <Menu.Item key={m.name} onClick={onChange(m)} disabled={m.name === props.mode.name}>
                        <Tag color={m.color}>{m.name}</Tag>
                        {m.description}
                    </Menu.Item>
                )}
            </Menu>
            }
        >
            <EditOutlined />
        </Dropdown>}
    </>;
}