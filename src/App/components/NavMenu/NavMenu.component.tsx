import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {NavMenuProps} from "./NavMenu.d";
import { moduleLinks, profileLinks } from './NavMenu.helpers';
import './NavMenu.scss';

export const NavMenuComponent = (props:NavMenuProps) =>
    <Menu mode="inline" theme="dark" style={{height: "100vh"}}>
        <Menu.Divider />
        {profileLinks.map(({url, icon, text}) =>
            <Menu.Item key={url}>
                <Link to={url}>{icon} {text}</Link>
            </Menu.Item>
        )}
        <Menu.Divider />
        {moduleLinks.map(({url, icon, text}) => 
            <Menu.Item key={url}>
                <Link to={url}>{icon} {text}</Link>
            </Menu.Item>
        )}
    </Menu>;
