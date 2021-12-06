import { ILoginInputOptions, ISessionInfo, login, logout as authnLogout } from "@inrupt/solid-client-authn-browser";
import { useLocalStorage as ls} from "unstateless";

interface IPopulatedSessionInfo extends ISessionInfo {
    webId: string;
}

export interface IUseSession extends IPopulatedSessionInfo {
    set: (session:IPopulatedSessionInfo) => void;
    login: (options:ILoginInputOptions) => void;
    logout: () => void;
}

const emptySession:IPopulatedSessionInfo = {
    clientAppId: "",
    isLoggedIn: false,
    sessionId: "",
    webId: "",
};

const useSessionStorage = ls.object<IPopulatedSessionInfo>("solid-session", emptySession);

export const useSession = ():IUseSession => {
    const [info, setInfo] = useSessionStorage();

    const set = (session:IPopulatedSessionInfo) => {
        if(JSON.stringify(info)  !== JSON.stringify(session)) {
            setInfo(session);
        }
    }

    const logout = () => {
        set(emptySession);
        authnLogout();
    }

    return {...info, set, login, logout};
}