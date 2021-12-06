import React from 'react';
import { useLoader } from './useLoader';

// Hard-coding the meta datafile location for now until the Solid community finishes the spec.
export const useMeta = (uri:string):[string, boolean] => {
    const [metaUri, setMetaUri] = React.useState<string>(`${uri}.meta.ttl`);

    const loader = useLoader();

    return [metaUri, loader.isLoading];
}