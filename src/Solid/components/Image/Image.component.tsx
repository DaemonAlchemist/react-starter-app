import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFileClient } from '../../lib/useFileClient';
import { ImageProps } from "./Image.d";
import './Image.scss';

// Note:  We need this complicated way of displaying an image due to the Solid auth requirements.
//        <img src="..." /> doesn't work because there's no way to send the auth token with the GET.
export const ImageComponent = (props:ImageProps) => {
    const [dataUrl, setDataUrl] = useState<string>("/solid-logo.png");
    const client = useFileClient();

    useEffect(() => {
        client.get(props.src).then(data => {
            const url = URL.createObjectURL(data);
            setDataUrl(url);

            // Revoke the data URL after loading to preserve memory
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
        });
    }, [props.src]);

    return <Spin spinning={client.isLoading}>
        <img src={dataUrl} alt={props.alt || props.src} />
    </Spin>;
}
