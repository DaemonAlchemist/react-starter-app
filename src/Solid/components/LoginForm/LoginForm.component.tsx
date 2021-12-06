import { LoginOutlined } from '@ant-design/icons';
import { Input, Modal } from 'antd';
import React, { useState } from 'react';
import { useSession } from '../../lib/useSession';
import { LoginFormProps } from "./LoginForm.d";
import './LoginForm.scss';

export const LoginFormComponent = (props:LoginFormProps) => {
    const session = useSession();
    const [provider, setProvider] = useState<string>(props.defaultProvider || "");
    const updateProvider = (e:React.ChangeEvent<HTMLInputElement>) => {
        setProvider(e.currentTarget.value);
    }

    const login = (curProvider:string) => () => {
        session.login({
            oidcIssuer: curProvider,
        });
    }

    return <Modal
        visible={!session.isLoggedIn}
        title="Login"
        footer={null}
    >
        <Input
            placeholder='Identity provider'
            value={provider}
            addonBefore="Your provider"
            addonAfter={<LoginOutlined onClick={login(provider)}/>}
            onChange={updateProvider}
            onPressEnter={login(provider)}
        />
    </Modal>;
}
