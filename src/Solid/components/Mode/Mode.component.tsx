import { Tag } from 'antd';
import React from 'react';
import { getAclMode } from '../../lib/getAclMode';
import { ModeProps } from "./Mode.d";
import './Mode.scss';

export const ModeComponent = (props:ModeProps) => {
    const mode = getAclMode(props.modes);
    return <Tag color={mode.color}>{mode.name}</Tag>;
}
