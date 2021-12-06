import { InputProps } from "antd/lib/input";

// What gets passed into the component from the parent as attributes
export declare interface IDebouncedInputInputProps extends Omit<InputProps, "onChange"> {
    timeout: number;
    onChange: (value:string) => void;
    textarea?: boolean;
}

export type DebouncedInputProps = IDebouncedInputInputProps;