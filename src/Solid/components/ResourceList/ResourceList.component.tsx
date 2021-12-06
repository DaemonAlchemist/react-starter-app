import React from 'react';
import { Resource } from '../Resource';
import { ResourceSelector } from '../ResourceSelector';
import { ResourceListProps } from "./ResourceList.d";
import './ResourceList.scss';

export const ResourceListComponent = (props:ResourceListProps) =>
    <div className="resource-list">
        {props.resources.map((resource) =>
            <Resource key={resource.value} webId={resource.value} onDelete={props.onDelete} />
        )}
        {!!props.onSelect && <ResourceSelector label="" placeholder="Add user or group" onSelect={props.onSelect}/>}
    </div>;
