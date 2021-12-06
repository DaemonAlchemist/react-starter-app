import { Tag, Tooltip } from 'antd';
import React from 'react';
import { matchOn } from 'ts-functional';
import { TypeNameProps } from "./TypeName.d";
import './TypeName.scss';

const typeName = (name:string) => matchOn(
    [
        // Media type resources
        [/http\:\/\/www\.w3\.org\/ns\/iana\/media-types.*/, () => (name.split("/").pop() || "").replace("#Resource", "").toUpperCase()]
    ],
    // All other resources
    name.split(/[/#]/g).pop()
)(name);

export const TypeNameComponent = (props:TypeNameProps) =>
    <Tooltip title={props.name}>
        <Tag>{typeName(props.name)}</Tag>
    </Tooltip>;
