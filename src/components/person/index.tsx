import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchUser} from "../../redux/slice/user";


//styles
import './person.css'
import {Upload} from "../../assets/svg";
const PersonPage = () => {
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const {data} = useAppSelector(state => state.user)

    useEffect(() => {
        dispatch(fetchUser({id}))
    }, []);


    return (
        <div className='person'>
            <h4>{data?.last_name}</h4>
            <div className='person__item'>
                <div className='person__avatar'
                    style={{
                        background: `url('/1.png') center center / cover no-repeat`,
                        // background: data?.avatar ? `url(${data?.avatar})` : '/1.png',
                    }}
                >
                    <div className='person__upload'>
                        <Upload/>
                    </div>
                </div>
                <div className='person__info'>
                    <div className='person__info__item'>
                        <p>Статус:</p>
                        <input type="text" defaultValue={data?.role}/>
                        <button>Edit</button>
                    </div>
                    <div className='person__info__item'>
                        <p>Фамилия:</p>
                        <input type="text" defaultValue={data?.last_name}/>
                        <button>Edit</button>
                    </div>
                    <div className='person__info__item'>
                        <p>Имя:</p>
                        <input type="text" defaultValue={data?.first_name}/>
                        <button>Edit</button>
                    </div>
                    <div className='person__info__item'>
                        <p>Телефон:</p>
                        <input type="text" defaultValue={data?.phone}/>
                        <button>Edit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonPage;
