// What gets passed into the component from the parent as attributes
export declare interface IResourceSelectorInputProps {
    onSelect: (webId:string) => void;
    label: string;
    placeholder?: string;
    allowedTypes?: NamedNode[];
}

export type ResourceSelectorProps = IResourceSelectorInputProps;