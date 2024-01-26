import React from 'react';



//styles
import './old-page.css'
import {Link, useNavigate} from "react-router-dom";
const OldPage = () => {

    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    return (
        <div className='old-page'>
            <h4>Админ панель</h4>
           <Link to={token ? '/admin' : '/login'}>
               Войти
           </Link>
        </div>
    );
};

export default OldPage;
