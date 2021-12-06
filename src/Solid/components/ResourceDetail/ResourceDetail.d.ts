import { UploadRequestOption } from 'rc-upload/lib/interface';

// What gets passed into the component from the parent as attributes
export declare interface IResourceDetailInputProps {
    webId: string;
    className?: string;
    editable?: boolean;
    onChangeName?: (name:string) => Promise<any>;
    onChangeImage?: (file:UploadRequestOption) => Promise<any>;
}

export type ResourceDetailProps = IResourceDetailInputProps;