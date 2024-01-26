import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {apiToken} from "../../axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const RegisterPage = () => {

    const navigation = useNavigate()

    const [inputValue, setInputValue] = useState({})

    const handleOnChange = (e: any) => {
        setInputValue({...inputValue, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        apiToken.post('/auth/register/', inputValue)
            .then((res) => {
                localStorage.setItem("token", res.data.token)
                navigation('/login')
            }).catch((error) => {
            console.log(error)
        })
    }

    console.log(inputValue)

    return (
        <div className='register'>
            <h4>Регистрация</h4>
            <div className='register__item'>
                <form onSubmit={handleSubmit}>
                    <div className='register__input'>
                        <input name='first_name' onChange={handleOnChange} placeholder='Пишите ваше Имя' type="text"/>
                    </div>
                    <div className='register__input'>
                        <input name='last_name' onChange={handleOnChange} placeholder='Пишите ваше Фамилию' type="text"/>
                    </div>
                    <div className='register__input'>
                        <input name='email' onChange={handleOnChange}  placeholder='Пишите ваше Почту' type="text"/>
                    </div>
                    <div className='register__input'>
                        <input name='password' onChange={handleOnChange}  placeholder='Пишите ваше Пароль' type="text"/>
                    </div>
                    <div className='register__input'>
                        <input name='phone' onChange={handleOnChange}  placeholder='Пишите ваше Номер' type="text"/>
                    </div>
                    <div className='register__link'>
                        <Link to='/login'>
                            У меня есть аккаунт!
                        </Link>
                    </div>
                    <button type='submit'>
                        Зарегистрироваться
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
