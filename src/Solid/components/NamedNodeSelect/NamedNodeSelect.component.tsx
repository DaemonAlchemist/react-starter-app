import { Select } from 'antd';
import * as React from 'react';
import { NamedNodeSelectProps } from "./NamedNodeSelect.d";
import './NamedNodeSelect.scss';

export const NamedNodeSelectComponent = (props:NamedNodeSelectProps) => {
    const onChange = (names:string[]) => {
        props.onChange(names.map((name:string) => props.options[name]));
    }

    return <Select
        className="type-selector"
        mode="multiple"
        placeholder="What kind?"
        onChange={onChange}
        value={Object.keys(props.options).filter((name:string) => props.values.map((v) => v.value).includes(props.options[name].value))}
    >
        {Object.keys(props.options).map((name:string) =>
            <Select.Option key={name} value={name}>
                {name}
            </Select.Option>
        )}
    </Select>;
}
