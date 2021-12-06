import { Button, Popconfirm, Typography } from 'antd';
import React from 'react';
import { useRDF } from '../../../Solid';
import { DeleteSubjectButtonProps } from "./DeleteSubjectButton.d";
import './DeleteSubjectButton.scss';

export const DeleteSubjectButtonComponent = (props:DeleteSubjectButtonProps) => {
    const rdf = useRDF();
    const {store} = rdf.graph;

    const onDelete = () => {
        const deletions = store.statementsMatching(props.subject, null, null, props.doc);
        rdf.update(deletions, []);
    }

    return <Popconfirm title="Are you sure you want to delete this?" onConfirm={onDelete} okText="Delete" cancelText="Cancel">
        <Button type="link">
            <Typography.Text type="danger">{props.children}</Typography.Text>
        </Button>
    </Popconfirm>;
}
