// What gets passed into the component from the parent as attributes
export declare interface IUploadButtonInputProps {
    directory: string;
    onSuccess?: () => void;
    onFailure?: () => void;
}

export type UploadButtonProps = IUploadButtonInputProps;