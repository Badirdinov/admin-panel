import React, {useEffect, useState} from 'react';


//styles
import './staff.css'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {fetchUsers} from "../../../redux/slice/users";
import {Link} from "react-router-dom";
import Modal from "../../modal";
import CustomInput from "../../ui/input";
import CustomButton from "../../ui/button";

const Staff = () => {

    const dispatch = useAppDispatch()

    const {data} = useAppSelector(state => state.users)

    const [inputValue, setInputValue] = useState({});
    const [activeModal, setActiveModal] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInputValue({...inputValue, [name]: value})
    }

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(inputValue)
        setActiveModal(prevState => !prevState)
    }

    return (
        <div className='staff'>
            <div className='staff__title'>
                <h4>Персоналы</h4>
                <button
                    onClick={() => setActiveModal(true)}
                >
                    Добавить персонала
                </button>
            </div>
            {activeModal && <Modal close={() => setActiveModal(prevState => !prevState)} title={'Добавить персонала'}>
                <form onSubmit={handleSubmit}>
                    <CustomInput onChange={handleChange} name={'first_name'} placeholder={'Имя'}/>
                    <CustomInput onChange={handleChange} name={'last_name'} placeholder={'Фамилия'}/>
                    <CustomInput onChange={handleChange} name={'phone'} placeholder={'Номер телефона'}/>
                    <CustomInput onChange={handleChange} name={'email'} placeholder={'Электронная почта'}/>
                    <CustomInput onChange={handleChange} name={'password'} placeholder={'Пароль'}/>
                    <CustomInput onChange={handleChange} name={'role'} placeholder={'Роль'}/>
                    <CustomButton variant={'primary'} type='submit'>
                        Добавить
                    </CustomButton>
                </form>
            </Modal>
            }

            <table className='staff__table'>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Номер телефона</th>
                    <th>Полное имя</th>
                    <th>Электронная почта</th>
                    <th>роль</th>
                    <th>В сети</th>
                    <th>Аватар</th>
                </tr>
                </thead>
                <tbody>
                {data?.results?.map((item: any) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td><Link to={`/admin/staff/${item.id}`}>{item.phone}</Link></td>
                        <td>{item.last_name + ' ' + item.first_name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>{item.is_active ? 'В сети' : 'Не в сети'}</td>
                        <td>
                            <p className='staff__table__avatar'>
                                <img src={item.avatar} alt="Avatar"/>
                            </p>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Staff;
