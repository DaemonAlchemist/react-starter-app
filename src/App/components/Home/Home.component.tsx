import { Col, Row } from 'antd';
import React from 'react';
import { HomeProps } from "./Home.d";
import './Home.scss';

export const HomeComponent = (props:HomeProps) => 
    <Row>
        <Col xs={{offset: 6, span: 12}}>
            <h1>Solid Pod Admin</h1>

            <h2>What is Solid?</h2>

            <h2>Why should I care?</h2>

            <h2>What can Solid do for me?</h2>


        </Col>
    </Row>