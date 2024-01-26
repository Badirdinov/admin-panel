import React from 'react';
import AdminLayout from "./admin";
import {useNavigate} from 'react-router-dom';
import LoginPage from "../auth/login";

const Administrator = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    if (!token) {
        navigate('/login');
        return <LoginPage/>;
    } else {
        return <AdminLayout />;
    }
};

export default Administrator;