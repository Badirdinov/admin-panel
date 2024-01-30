import React, {useEffect, useState} from 'react';


//styles
import './staff.css'
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {addUser, deleteUser, editUser, fetchUsers} from "../../../redux/slice/users";
import {Link} from "react-router-dom";
import Modal from "../../modal";
import CustomInput from "../../ui/input";
import CustomButton from "../../ui/button";
import {apiToken} from "../../../axios";

const Staff = () => {

    const dispatch = useAppDispatch()

    const {data} = useAppSelector(state => state.users)
    const [checkedInput, setCheckedInput] = useState<{ [key: string]: string }>({});

    const [inputValue, setInputValue] = useState({});
    const [isChangeUserModal, setIsChangeUserModal] = useState(false)
    const [isEditUserModal, setIsEditUserModal] = useState(false);

    const [valueEditInput, setValueEditInput] = useState({});
    const [edit, setEdit] = useState<any>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInputValue({...inputValue, [name]: value})
    }

    const handleChangeEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files) {
            setValueEditInput({...valueEditInput, [e.target.name]: e.target.files[0]})
        }
        setValueEditInput({...valueEditInput, [e.target.name]: e.target.value})
    }


    const handleAddUser = (e: any) => {
        e.preventDefault();
        const flattenedInputValue = Object.entries(inputValue).reduce(
                    (acc: any, [key, value]) => {
                        acc[key] = value
                        return acc
                    }, {}
                )
        apiToken.post('/auth/users/', flattenedInputValue, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    dispatch(addUser(flattenedInputValue));
                    setIsChangeUserModal(false);
                    dispatch(fetchUsers());
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }



    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        apiToken.patch(`/auth/users/${edit.id}/`, valueEditInput)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(editUser({valueEditInput, id: edit.id}));
                    setIsEditUserModal(false)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };


    const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setCheckedInput({
                ...checkedInput,
                [e.target.name]: e.target.name
            });
        } else {
            const {[e.target.name]: omitted, ...rest} = checkedInput;
            setCheckedInput(rest);
        }
    }

    const handleDeleteUser = (item: any) => {
        apiToken.delete(`/auth/users/${item.id}/`)
            .then((res) => {
                dispatch(deleteUser(item))
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch]);


    return (
        <>
            {isChangeUserModal &&
              <Modal close={() => setIsChangeUserModal(prevState => !prevState)} title={'Добавить персонала'}>
                  <div className='edit__photo'>
                      <label htmlFor='ava' className='staff__table__avatar__edit'>
                          <img src="/svg/edit.svg" alt="Avatar"/>
                      </label>
                      <input onChange={handleChange} name='avatar' type="file" id='ava' hidden/>
                      <div className='edit__photo__img'>
                          <img src={edit?.avatar} alt="Avatar"/>
                      </div>
                  </div>
                  <form onSubmit={handleAddUser}>
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
            {isEditUserModal && <Modal title={'Редактирование'} close={() => {
                setIsEditUserModal(false)
                setEdit(null)
            }}>
                <form action="">
                    <div className='edit__photo'>
                        <label htmlFor='ava' className='staff__table__avatar__edit'>
                            <img src="/svg/edit.svg" alt="Avatar"/>
                        </label>
                        <input onChange={handleChangeEdit} name='avatar' type="file" id='ava' hidden/>
                        <div className='edit__photo__img'>
                            <img src={edit?.avatar} alt="Avatar"/>
                        </div>
                    </div>
                    <CustomInput value={edit?.first_name} onChange={handleChangeEdit} name={'first_name'}/>
                    <CustomInput value={edit?.last_name} onChange={handleChangeEdit} name={'last_name'}/>
                    <CustomInput value={edit?.phone} onChange={handleChangeEdit} name={'phone'}/>
                    <CustomInput value={edit?.email} onChange={handleChangeEdit} name={'email'}/>
                    <CustomInput value={edit?.role} onChange={handleChangeEdit} name={'role'}/>
                    <CustomButton onClick={(e) => handleEditSubmit(e)}>Сохранить</CustomButton>
                </form>
            </Modal>
            }
            <div className='staff'>
                <div className='staff__title'>
                    <h4>Персоналы</h4>
                    <div className='staff__title__btns'>
                        <CustomButton
                            variant={'danger'}
                        >
                            Удалить выбранные
                        </CustomButton>
                        <CustomButton
                            variant={'primary'}
                            onClick={() => setIsChangeUserModal(true)}
                        >
                            Добавить персонала
                        </CustomButton>
                    </div>

                </div>

                <table className='staff__table'>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Сотрудник</th>
                        <th>Номер телефона</th>
                        <th>роль</th>
                        <th>В сети</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {data?.results.map((item: any) => (
                        <tr key={item.id}>
                            <td><input type="checkbox" name={item.id} onChange={(e) => handleChecked(e)}/></td>
                            <td className='table__img'>
                                <p className='staff__table__avatar'>
                                    {item.avatar ? (
                                        <img src={item.avatar} alt="Avatar"/>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M12 12C14.7617 12 17 9.76172 17 7C17 4.23828 14.7617 2 12 2C9.23828 2 7 4.23828 7 7C7 9.76172 9.23828 12 12 12ZM15.5 13.25H14.8477C13.9805 13.6484 13.0156 13.875 12 13.875C10.9844 13.875 10.0234 13.6484 9.15234 13.25H8.5C5.60156 13.25 3.25 15.6016 3.25 18.5V20.125C3.25 21.1602 4.08984 22 5.125 22H18.875C19.9102 22 20.75 21.1602 20.75 20.125V18.5C20.75 15.6016 18.3984 13.25 15.5 13.25Z"
                                                fill="black"/>
                                        </svg>)}
                                </p>
                                <div>
                                    <p>{item.last_name + ' ' + item.first_name}</p>
                                    <p>{item.email}</p>
                                </div>
                            </td>
                            <td><Link to={`/admin/staff/${item.id}`}>{item.phone}</Link></td>
                            <td>{item.role}</td>
                            <td className='status'>{item.is_active ? (
                                <p className='online'>В сети</p>
                            ) : (
                                <p className='offline'>Не сети</p>
                            )}</td>
                            <td className='table__btns'>
                                <CustomButton onClick={() => {
                                    setIsEditUserModal(true)
                                    setEdit(item)
                                }} variant={'primary'}>
                                    Редактировать
                                </CustomButton>
                                <CustomButton onClick={() => handleDeleteUser(item)} variant={'danger'}>
                                    Удалить
                                </CustomButton>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Staff;
