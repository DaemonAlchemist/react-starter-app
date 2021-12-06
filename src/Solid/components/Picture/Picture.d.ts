import { UploadRequestOption } from 'rc-upload/lib/interface';
import { Quad_Subject } from "rdflib/lib/tf-types";

// What gets passed into the component from the parent as attributes
export declare interface IPictureInputProps {
    subject: Quad_Subject | null;
    children?: any;
    size?:string;
    editable?: boolean;
    onUpload?: (options:UploadRequestOption) => Promise<any>;
}

export type PictureProps = IPictureInputProps;