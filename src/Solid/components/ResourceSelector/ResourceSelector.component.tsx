import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import * as React from 'react';
import { Index } from 'ts-functional/dist/types';
import { sym } from '../../index';
import { Resource } from '../Resource';
import { ResourceSelectorProps } from "./ResourceSelector.d";
import './ResourceSelector.scss';

const translations:Index<(name:string) => string> = {
    inrupt: (name:string) => `https://${name}.inrupt.net/profile/card#me`,
}

const translateWebId = (value:string) => {
    if(value.indexOf("http") === 0) {
        return value;
    } else {
        const [provider, name] = value.split("/");
        return translations[provider](name);
    }
}

export const ResourceSelectorComponent = (props:ResourceSelectorProps) => {
    const [webId, setWebId] = React.useState("");
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setWebId(e.currentTarget.value);
        setCurWebId("");
    }

    const selectResource = () => {
        if(curWebId) {
            setWebId("");
            setCurWebId("");
            props.onSelect(curWebId);
        } else {
            searchResource();
        }
    }

    const [curWebId, setCurWebId] = React.useState("");
    const searchResource = () => {
        const translatedWebId = translateWebId(webId);
        setWebId(translateWebId);
        try {
            sym(translatedWebId);
            setCurWebId(translatedWebId);
        } catch(e) {
            setCurWebId("");
        }
    }


    return <Input
        addonBefore={props.label}
        value={webId}
        placeholder={props.placeholder || "WebID"}
        addonAfter={<>
            {!!curWebId
                ? <CheckOutlined onClick={selectResource} />
                : <SearchOutlined onClick={selectResource} />
            }
            {!!curWebId && <>&nbsp;<Resource webId={curWebId} /></>}
        </>}
        onChange={onChange}
        onPressEnter={selectResource}
    />;
}
