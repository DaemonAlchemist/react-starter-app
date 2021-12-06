import { InfoCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { BasicInfo } from '../components/Editors/BasicInfo';
import { EditorRegistrator } from "./useRegisteredEditors/useRegisteredEditors.d";

export const solidEditors:EditorRegistrator = (types:string[]) => [
    {
        Editor: ({subject}) => <BasicInfo subject={subject} />,
        name: <><InfoCircleOutlined /> Basic Info</>,
    },
];