import React, { useEffect, useState } from 'react';


//styles
import './category.css'
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addMenu, deleteMenu, editMenu, getMenu } from "../../redux/slice/menu";
import CustomButton from "../ui/button";
import Modal from "../modal";
import CustomInput from "../ui/input";
import { apiToken } from "../../axios";


const CategoryPage = () => {
    const dispatch = useAppDispatch()
    
    const { data } = useAppSelector(state => state.menu)
    const [ isActiveEditModal, setIsActiveEditModal ] = useState(false);
    const [ isActiveAddModal, setIsActiveAddModal ] = useState(false);
    const [ editInputValue, setEditInputValue ] = useState({});
    const [ addInputValue, setAddInputValue ] = useState({});
    const [ defaultValue, setDefaultValue ] = useState<any>(null)
    const changeEditMenu = (e : any) => {
        setEditInputValue({ ...editInputValue, [e.target.name]: e.target.value })
    }
    const changeAddMenu = (e : any) => {
        setAddInputValue({ ...addInputValue, [e.target.name]: e.target.value })
    }
    
    const handleClickEdit = (item : any) => {
        setIsActiveEditModal(true)
        setDefaultValue(item)
    }
    
    const handSaveEdit = (e : any) => {
        e.preventDefault()
        apiToken.patch(`/menu/${ defaultValue.id }/`, editInputValue)
          .then((res) => {
              if ( res.status === 200 ) {
                  dispatch(editMenu({ editInputValue, id: defaultValue.id }))
                  setIsActiveEditModal(false)
              }
          })
          .catch((error) => {
              console.log(error)
          })
    }
    
    const handleAddMenu = (e : any) => {
        e.preventDefault()
        apiToken.post('/menu/', addInputValue)
          .then((res) => {
              if ( res.status === 201 ) {
                  dispatch(addMenu(addInputValue))
                  setIsActiveAddModal(false)
              }
          })
          .catch((error) => {
              console.log(error)
          })
    }
    
    const handleDeleteMenu = (id : any) => {
        apiToken.delete(`/menu/${ id }/`)
          .then((res) => {
              if ( res.status === 204 ) {
                  dispatch(deleteMenu(id))
              }
          })
          .catch((error) => {
              console.log(error)
          })
    }
    
    useEffect(() => {
        dispatch(getMenu())
    }, [ dispatch, isActiveAddModal ]);
    
    
    return (
      <>
          { isActiveAddModal && <Modal title={ 'Добавить категорию' } close={ () => setIsActiveAddModal(false) }>
              <form action="">
                  <CustomInput label={ 'Название меню' } name={ 'name' } onChange={ changeAddMenu }/>
                  <CustomInput label={ 'Описание' } name={ 'description' } onChange={ changeAddMenu }/>
                  <CustomButton
                    onClick={ handleAddMenu }
                    variant={ 'primary' }
                  >
                      Добавить
                  </CustomButton>
              </form>
          </Modal> }
          { isActiveEditModal && <Modal title={ 'Редактировать' } close={ () => setIsActiveEditModal(false) }>
              <form action="">
                  <CustomInput value={ defaultValue.name } label={ 'Название меню' } name={ 'name' }
                               onChange={ changeEditMenu }/>
                  <CustomInput value={ defaultValue.description } label={ 'Описание' } name={ 'description' }
                               onChange={ changeEditMenu }/>
                  <CustomButton
                    onClick={ (e) => handSaveEdit(e) }
                    variant={ 'primary' }
                  >
                      Сохранить
                  </CustomButton>
              </form>
          </Modal> }
          <section className='category'>
              <div className='category__title'>
                  <h4>Категории</h4>
                  <CustomButton
                    onClick={ () => setIsActiveAddModal(true) }
                    variant={ 'primary' }
                  >
                      Добавить категорию
                  </CustomButton>
              </div>
              <div className='category__items'>
                  <div className='category__item'>
                      <div className='category__cards'>
                          { data && data.results && data.results.map((item : any) => (
                            <div key={ item.id } className="category__card">
                                <div className='category__card__img'>
                                    <img src="/images/default.jpeg" alt=""/>
                                </div>
                                <div className='category__card__title'>
                                    <h4>Названия меню: <span>{ item.name }</span></h4>
                                    <h4>Кол-во блюд: <span>{ item.foods.length }</span></h4>
                                    <h5>Описание: <span>Description</span></h5>
                                </div>
                                <div className='category__card__btn'>
                                    <CustomButton
                                      onClick={ () => handleClickEdit(item) }
                                      variant={ 'primary' }
                                    >
                                        Редактировать</CustomButton>
                                    <CustomButton
                                      onClick={ () => handleDeleteMenu(item.id) }
                                      variant={ 'danger' }
                                    >
                                        Удалить
                                    </CustomButton>
                                </div>
                            </div>
                          )) }
                      </div>
                  </div>
              </div>
          </section>
      </>
    );
};

export default CategoryPage;
