import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {apiToken} from "../../axios";

const Header = () => {

    const navigate = useNavigate()

    const isAuth = localStorage.getItem('token') || false;
    const [userData, setUserData] = useState<any>(null);


    useEffect(() => {
        apiToken.get('/auth/profile/')
            .then((res) => {
                setUserData(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);

    const logout = () => {
        navigate('/')
        localStorage.removeItem('token')
    }


    return (
        <div className='header__items'>
            <div className='user__info'>
                <div className='header__icons'>
                    <div className='header__icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M0 5C0 3.61929 1.11929 2.5 2.5 2.5H17.5C18.8807 2.5 20 3.61929 20 5V15C20 16.3807 18.8807 17.5 17.5 17.5H2.5C1.11929 17.5 0 16.3807 0 15V5ZM2.5 3.75C1.80964 3.75 1.25 4.30964 1.25 5V5.27113L10 10.5211L18.75 5.27113V5C18.75 4.30964 18.1904 3.75 17.5 3.75H2.5ZM18.75 6.72887L12.8649 10.2599L18.75 13.8815V6.72887ZM18.7078 15.3233L11.6573 10.9845L10 11.9789L8.34272 10.9845L1.29221 15.3233C1.43468 15.8569 1.92144 16.25 2.5 16.25H17.5C18.0786 16.25 18.5653 15.8569 18.7078 15.3233ZM1.25 13.8815L7.1351 10.2599L1.25 6.72887V13.8815Z" fill="#83C251"/>
                        </svg>
                    </div>
                    <div className='header__icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10 20C11.1059 20 12.044 19.282 12.3737 18.2867C12.5126 17.8673 12.1418 17.5 11.7 17.5H8.3C7.85817 17.5 7.48736 17.8673 7.62628 18.2867C7.95596 19.282 8.89413 20 10 20Z" fill="#83C251"/>
                            <path d="M10.3959 2.47777C10.1346 2.425 9.86539 2.425 9.60409 2.47777L9.00351 2.59906C6.7194 3.06036 5.00003 5.08079 5.00003 7.5C5.00003 8.28478 4.83207 10.2466 4.42644 12.1777C4.23575 13.0856 3.98402 14.0289 3.65376 14.8614C3.62749 14.9276 3.67596 15 3.74721 15H16.2528C16.324 15 16.3725 14.9276 16.3462 14.8614C16.016 14.0289 15.7643 13.0856 15.5736 12.1777C15.168 10.2466 15 8.28477 15 7.5C15 5.08077 13.2806 3.06034 10.9965 2.59906L10.3959 2.47777ZM17.7741 15C17.8699 15.1919 17.9709 15.37 18.0774 15.5312C18.2409 15.7789 18.056 16.25 17.7592 16.25H2.24084C1.94401 16.25 1.75907 15.7789 1.92263 15.5312C2.02909 15.37 2.13011 15.1919 2.22587 15C3.34903 12.7492 3.75003 8.59895 3.75003 7.5C3.75003 4.51724 5.83948 2.0225 8.63455 1.39961C8.70328 1.38429 8.75 1.32042 8.75 1.25C8.75 0.559644 9.30964 0 10 0C10.6904 0 11.25 0.559644 11.25 1.25C11.25 1.32042 11.2967 1.38428 11.3654 1.39959C14.1605 2.02246 16.25 4.51722 16.25 7.5C16.25 8.59895 16.651 12.7492 17.7741 15Z" fill="#83C251"/>
                        </svg>
                    </div>
                    <div className='header__user'>
                        <div className='header__user__img'>

                        </div>
                        <div className='header__user__name'>
                            <h4>{userData?.get_full_name}</h4>
                            <p>{userData?.role}</p>
                        </div>
                    </div>
                </div>
                <button onClick={logout}>
                    {isAuth ? 'Выйти' : 'Войти'}
                </button>
            </div>
        </div>
    );
};

export default Header;
