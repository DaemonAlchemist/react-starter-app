// What gets passed into the component from the parent as attributes
export declare interface IFileInputProps {
    node:NamedNode;
    onDelete?: (uri:string) => void;
    onEdit?: (uri:string) => void;
}

export type FileProps = IFileInputProps;