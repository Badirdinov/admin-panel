import React from 'react';


//styles
import './ui.css';


interface IPropsButton {
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
}

const CustomButton = ({children, type, onClick, variant}: IPropsButton) => {
    return (
        <button type={type} onClick={onClick} className={variant === 'primary' ? 'custom__button__primary' : 'custom__button__secondary'}>
            {children}
        </button>
    );
};

export default CustomButton;
