import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { useState } from 'react';

export const useToggle = (defaultIsOn:boolean = false):{
    isOn: boolean;
    on: () => void;
    off: () => void;
    toggle: () => void;
    onChange: (e:CheckboxChangeEvent) => void;
} => {
    const [isOn, setIsOn] = useState<boolean>(defaultIsOn);
    const on = () => {setIsOn(true);}
    const off = () => {setIsOn(false);}
    const toggle = () => {setIsOn(s => !s);}
    const onChange = (e:CheckboxChangeEvent) => {setIsOn(e.target.checked);}

    return {isOn, on, off, toggle, onChange};
}