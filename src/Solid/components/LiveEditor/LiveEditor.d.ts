// What gets passed into the component from the parent as attributes
export declare interface ILiveEditorInputProps {
    doc: NamedNode | null;
    subject: NamedNode | null;
    predicate: NamedNode;
    label: string;
    textarea?: boolean;
}

export type LiveEditorProps = ILiveEditorInputProps;