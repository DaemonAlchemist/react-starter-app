import { InfoCircleOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import React from 'react';
import { TermProps } from "./Term.d";
import './Term.scss';

export const TermComponent = (props:TermProps) =>
    <Tooltip title={<>
        <InfoCircleOutlined /> Techie notes:<br/>
        {props.definition}
    </>}>
        <span className="term">
            {props.children}
        </span>
    </Tooltip>;
