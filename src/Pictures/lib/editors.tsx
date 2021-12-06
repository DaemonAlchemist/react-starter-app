import { PictureOutlined } from '@ant-design/icons';
import React from 'react';
import { nsRaw } from '../../Solid';
import { EditorRegistrator } from '../../Solid/lib/useRegisteredEditors/useRegisteredEditors.d';

export const imageEditors:EditorRegistrator = (types:string[]) => {
    const editors = [];
    const {purl} = nsRaw;

    if(types.includes(purl("Image"))) {
        editors.push({
            Editor: ({subject}:any) => <>Image editor goes here</>,
            name: <><PictureOutlined /> Image Info</>,
        })
    }

    return editors;
}
