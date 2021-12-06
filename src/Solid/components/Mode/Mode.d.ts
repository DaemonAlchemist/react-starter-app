// What gets passed into the component from the parent as attributes
export declare interface IModeInputProps {
    modes: NamedNode[];
}

export type ModeProps = IModeInputProps;

export interface IMode {
    name: string;
    description: JSX.Element | string;
    color: string;
    modes: string[];
}
