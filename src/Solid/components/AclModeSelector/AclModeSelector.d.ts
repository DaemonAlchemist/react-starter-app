import { IMode } from "../Mode/Mode";

// What gets passed into the component from the parent as attributes
export declare interface IAclModeSelectorInputProps {
    mode:IMode;
    disabled?: boolean;
    onChange: (newMode:IMode) => void;
}

export type AclModeSelectorProps = IAclModeSelectorInputProps;