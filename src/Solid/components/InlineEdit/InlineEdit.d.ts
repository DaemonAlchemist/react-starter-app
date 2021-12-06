// What gets passed into the component from the parent as attributes
export declare interface IInlineEditInputProps {
    value: string;
    editable?: boolean;
    onSave: (newValue:string) => Promise<any>;
}

export type InlineEditProps = IInlineEditInputProps;