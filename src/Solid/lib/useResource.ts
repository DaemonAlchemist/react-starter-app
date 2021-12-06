import { useEffect } from "react";
import { useRDF } from "..";

export const useResource = (uri?:string):(() => void) => {
    const rdf = useRDF();

    const refresh = () => {
        if(uri) {
            rdf.fetch(uri);
        }
    };

    useEffect(refresh, [uri]);

    return refresh;
}