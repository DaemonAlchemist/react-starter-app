import { FrownOutlined, WarningOutlined } from '@ant-design/icons';
import { Alert, Col, Row } from 'antd';
import React from 'react';
import {WIPProps} from "./WIP.d";
import './WIP.scss';

export const WIPComponent = (props:WIPProps) =>
    <Row>
        <Col xs={24} sm={{offset: 6, span: 12}}>
            <Alert className="alert-wip" type="error" message={<>
                <h1><WarningOutlined /> Work In Progress <WarningOutlined /></h1>
                <p><b>Warning:</b> This page or section is a <em>Work In Progress</em>.  Things may not work correctly or at all at this time. <b><em>Do not use this</em></b> unless you want to screw up your Pod and/or lose your data.</p>
            </>}/>
        </Col>
    </Row>;
