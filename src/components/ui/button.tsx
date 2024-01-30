import React from 'react';


//styles
import './ui.css';


interface IPropsButton {
    type?: 'button' | 'submit' | 'reset'
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'danger'
    className?: string
}

const CustomButton = ({children, type, onClick, variant, className}: IPropsButton) => {
    return (
        <button type={type} onClick={onClick} className={`${className} ${variant === 'primary' ? 'custom__button__primary'  : variant === 'danger' ? 'custom__button__danger' : 'custom__button__secondary'}`}>
            {children}
        </button>
    );
};

export default CustomButton;
