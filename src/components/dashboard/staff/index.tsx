import React, {useEffect} from 'react';


//styles
import './staff.css'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {fetchUsers} from "../../../redux/slice/users";

const Staff = () => {

    const dispatch = useAppDispatch()

    const {data} = useAppSelector(state => state.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, []);

    console.log(data)

    return (
        <div className='staff'>
            <div className='staff__title'><h4>Персоналы</h4></div>
            <table className='staff__table'>
                <thead>
                    <tr>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Роле</th>
                        <th>В сети</th>
                    </tr>
                </thead>
                <tbody>
                {data?.results?.map((item: any) => (
                    <tr key={item.id}>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.role}</td>
                        <td>{item.is_active ? 'В сети' : 'Не в сети'}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default Staff;
