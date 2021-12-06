import { handleIncomingRedirect, ISessionInfo } from '@inrupt/solid-client-authn-browser';
import { useEffect } from 'react';
import { useSession } from '../../lib/useSession';
import { SessionProps } from "./Session.d";
import './Session.scss';

export const SessionComponent = (props:SessionProps) => {
    const session = useSession();

    useEffect(() => {
        handleIncomingRedirect({
            restorePreviousSession: true,
        }).then((info?:ISessionInfo) => {
            if(!!info){
                session.set({webId: "", ...info});
            }
        }).catch(e => {
            session.logout();
        });
    }, [session.webId]);

    return null;
}
