import { Col, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { DebouncedInputProps } from "./DebouncedInput.d";
import './DebouncedInput.scss';

export const DebouncedInputComponent = ({timeout, value, onChange, ...props}:DebouncedInputProps) => {
    const [curValue, setCurValue] = useState(value);
    const [trigger, setTrigger] = useState<any>();

    useEffect(() => {
        setCurValue(value);
    }, [value]);

    const debouncedOnChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.currentTarget.value;
        setCurValue(newValue);
        clearTimeout(trigger);
        setTrigger(setTimeout(() => {
            if(onChange) {
                onChange(newValue as string);
            }
        }, timeout));
    }

    return props.textarea
        ? <Row>
            <Col xs={8}>{!!props.addonBefore && <label>{props.addonBefore}</label>}</Col>
            <Col xs={{offset: 4, span: 8}}>{!!props.addonAfter && <label>{props.addonAfter}</label>}</Col>
            <Col xs={24}>
                <Input.TextArea value={curValue} onChange={debouncedOnChange} />
            </Col>
        </Row>
        : <Input {...props} value={curValue} onChange={debouncedOnChange} />;
}
