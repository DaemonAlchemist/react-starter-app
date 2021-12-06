import { useState } from "react";

export const useInput = (defaultValue?:string) => {
    const [value, setValue] = useState<string>(defaultValue || "");
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {setValue(e.currentTarget.value);}
    const clear = () => {setValue("");}

    return {value, setValue, onChange, clear};
}