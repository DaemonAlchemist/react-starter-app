import { CloudOutlined } from '@ant-design/icons';
import { Col, Layout, Menu, Row } from 'antd';
import React from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter, Link } from 'react-router-dom';
import { PicturesPage } from '../../../Pictures/components/PicturesPage';
import { AboutMePage } from '../../../Profile/components/AboutMePage';
import { AppsPage } from '../../../Profile/components/AppsPage';
import { ContactsPage } from '../../../Profile/components/ContactsPage';
import { GroupsPage } from '../../../Profile/components/GroupsPage';
import { PodInitializer, useSession } from '../../../Solid';
import { Directory } from '../../../Solid/components/Directory';
import { LoginForm } from '../../../Solid/components/LoginForm';
import { Session } from '../../../Solid/components/Session';
import { Home } from '../Home';
import { NavMenu } from '../NavMenu';
import './App.scss';

export const App = (props:any) => {
    const session = useSession();

    return <>
        <Session />
        <LoginForm defaultProvider='https://pod.wittrock.us' />
        {session.isLoggedIn && <PodInitializer />}
        <BrowserRouter>
            <Layout>
                <Layout.Header>
                    <Menu theme="dark" mode="horizontal">
                        <Menu.Item key="home"><Link to="/">
                            <CloudOutlined /> Solid POD Admin
                        </Link></Menu.Item>
                    </Menu>
                </Layout.Header>
                <Layout.Content>
                    <Row>
                        <Col xs={3}>
                            <NavMenu />
                        </Col>
                        <Col className="app-content" xs={21}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/about-me"  element={<AboutMePage  />} />
                                <Route path="/contacts"  element={<ContactsPage />} />
                                <Route path="/apps"      element={<AppsPage     />} />
                                <Route path="/groups"    element={<GroupsPage   />} />
                                <Route path="/storage/*" element={<Directory    />} />
                                <Route path="/images"    element={<PicturesPage />} />
                            </Routes>
                        </Col>
                    </Row>
                </Layout.Content>
            </Layout>
        </BrowserRouter>
    </>;
}