import { CloseOutlined, FolderOpenOutlined, FolderOutlined, PictureOutlined, PlusOutlined } from '@ant-design/icons';
import { Alert, Breadcrumb, Col, Menu, Row, Tag } from 'antd';
import React from 'react';
import { WIP } from '../../../Solid/components/WIP';
import { PicturesPageProps } from "./PicturesPage.d";
import './PicturesPage.scss';

export const PicturesPageComponent = (props:PicturesPageProps) => <Row>
    <Col xs={24}>
        <WIP />
        <h1><PictureOutlined /> Pictures</h1>
    </Col>
    <Col xs={12}>
        <Breadcrumb>
            <Breadcrumb.Item><a href="">Pictures</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Photos</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">2020</a></Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Camping</a></Breadcrumb.Item>
        </Breadcrumb>
    </Col>
    <Col xs={12}>
        <Alert type="warning" message={<>
            Visible to: <Tag>Friends <CloseOutlined /></Tag> <Tag>Family <CloseOutlined /></Tag> <Tag><PlusOutlined /></Tag>
            Editable by: <em>Nobody</em> <Tag><PlusOutlined /></Tag>
        </>} />
    </Col>
    <Col xs={24}><hr/></Col>
    <Col xs={4} style={{borderRight: "solid 1px"}}>
        <Menu mode="inline">
            <Menu.Item><FolderOutlined /> Artwork</Menu.Item>
            <Menu.SubMenu title={<><FolderOpenOutlined /> Photos</>}>
                <Menu.Item><FolderOutlined /> 2020</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item><FolderOutlined /> Artwork</Menu.Item>
        </Menu>
    </Col>
</Row>;
