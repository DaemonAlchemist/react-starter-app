// What gets passed into the component from the parent as attributes
export declare interface IResourceInputProps {
    webId: string;
    noImage?: boolean;
    noPopup?: boolean;
    className?: string;
    onDelete?: (webId:string) => void;
}

export type ResourceProps = IResourceInputProps;