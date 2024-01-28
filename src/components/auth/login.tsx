import React, {useState} from 'react';
import {apiToken} from "../../axios";
import {Link, useNavigate} from "react-router-dom";


//styles
import './auth.css'
const LoginPage = () => {

    const navigate = useNavigate()

    const [value, setValue] = useState({})

    const [isAdmin, setIsAdmin] = useState(false);


    const handleChange = (e: any) => {
        setValue({...value, [e.target.name] : e.target.value})
    }

    console.log(value)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        apiToken.post(`/auth/login/`, value)
            .then((res) => {
                localStorage.setItem('token', res.data.token)
                console.log(res.data)
                if(res.data.is_superuser){
                    navigate('/admin')
                }else {
                    setIsAdmin(true)
                }
            })
            .catch((error) => {
                console.log("ERROR", error)
            })
    }


    return (
        <div className='login'>
            <div className='login__item'>
                <h4>{isAdmin ? <span>Вы не можете войти</span> : 'Вход'}</h4>

                <form onSubmit={handleSubmit}>
                    <div className='login__input'>
                        <input name='phone' type="text" placeholder='Enter your phone' onChange={handleChange}/>
                    </div>
                    <div className='login__input'>
                        <input name='password' type="text" placeholder='Enter your password' onChange={handleChange}/>
                        <div className='login__links'>
                            <Link to='/'>Забыли пароль?</Link>
                            <Link to='/register'>Зарегистрироваться!</Link>
                        </div>
                    </div>
                    <button type={"submit"}>
                        Войти
                    </button>
                </form>


            </div>

        </div>
    );
};

export default LoginPage;
