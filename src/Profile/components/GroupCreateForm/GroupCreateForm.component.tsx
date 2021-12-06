import { PlusOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import * as rdfLib from 'rdflib';
import React from 'react';
import { v1 as uuid } from 'uuid';
import { a, ns, sym, usePublicType, useRDF, useSession } from '../../../Solid';
import { useLoader } from '../../../Solid/lib/useLoader';
import { GroupCreateFormProps } from "./GroupCreateForm.d";
import './GroupCreateForm.scss';

export const GroupCreateFormComponent = (props:GroupCreateFormProps) => {
    const session = useSession();
    const rdf = useRDF();
    const {vcard} = ns;
    const type = vcard("Group");
    const [doc, indexType] = usePublicType(session?.webId || "", type);

    const [name, setName] = React.useState("");
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
    }

    const loader = useLoader();
    const createGroup = () => {
        loader.start();
        if(indexType === "instanceContainer") {
            // TODO: Handle instanceContainer indexType
        } else {
            if(doc) {
                const id = uuid();
                const group = sym(`${doc.value}#${id}`);
                if(group) {
                    rdf.update([], [
                        rdfLib.st(group, a,               type,                     doc),
                        rdfLib.st(group, vcard("hasUID"), new rdfLib.Literal(id),   doc),
                        rdfLib.st(group, vcard("fn"),     new rdfLib.Literal(name), doc),
                    ], () => {
                        loader.done();
                        setName("");
                    });
                }
            }
        }
    }

    return <Spin spinning={loader.isLoading}>
        <Input
            onChange={onChange}
            onPressEnter={createGroup}
            addonBefore="Create a new Group"
            value={name}
            addonAfter={<PlusOutlined onClick={createGroup} />}
            placeholder="Group name"
        />
    </Spin>;
}
