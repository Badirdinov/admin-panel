"use client"
import React, {useState} from 'react';

//styles
import './ui.css'

interface IPropsInput {
    label?: string,
    name?: string
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    defaultValue?: string
    value?: string | undefined
}

const CustomInput = ({label, onChange, placeholder, name, defaultValue, value}: IPropsInput) => {
    const [state, setState] = useState(value);

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value)
        onChange(e)
    }

    return (
        <label className='custom__input'>
            <span>{label}</span>
            <input value={state}  type="text" onChange={onChangeInput} placeholder={placeholder} name={name}/>
        </label>
    );
};

export default CustomInput;
