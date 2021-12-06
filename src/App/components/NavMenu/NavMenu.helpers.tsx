import { ILink } from './NavMenu.d';
import {AppstoreOutlined, ContactsOutlined, FileTextOutlined, FolderOutlined, MessageOutlined, PictureOutlined, PlaySquareOutlined, SoundOutlined, TeamOutlined, TrophyOutlined, UserOutlined} from '@ant-design/icons';
import React from 'react';

export const profileLinks:ILink[] = [
    {url: "/about-me", icon: <UserOutlined />,       text: "About Me"  },
    {url: "/contacts", icon: <ContactsOutlined />,   text: "Contacts"  },
    {url: "/groups",   icon: <TeamOutlined />,       text: "Groups"    },
    {url: "/apps",     icon: <AppstoreOutlined />,   text: "Apps"      },
    {url: "/storage",  icon: <FolderOutlined />,     text: "My Content"},
  ];

export const moduleLinks:ILink[] = [
    {url: "/images",   icon: <PictureOutlined />,    text: "Pictures"  },
    {url: "/videos",   icon: <PlaySquareOutlined />, text: "Videos"    },
    {url: "/music",    icon: <SoundOutlined />,      text: "Music"     },
    {url: "/games",    icon: <TrophyOutlined />,     text: "Games"     },
    {url: "/posts",    icon: <FileTextOutlined />,   text: "Posts"     },
    {url: "/comments", icon: <MessageOutlined />,    text: "Comments"  },
  ];
  