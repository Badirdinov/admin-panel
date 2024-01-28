import React from 'react';

//styles
import './ui.css'

interface IPropsInput {
    label?: string,
    name?: string
    placeholder?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = ({label, onChange, placeholder, name}: IPropsInput) => {
    return (
        <label className='custom__input'>
            <span>{label}</span>
            <input type="text" onChange={onChange} placeholder={placeholder} name={name}/>
        </label>
    );
};

export default CustomInput;
