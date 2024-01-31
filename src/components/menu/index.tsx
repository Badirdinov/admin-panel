import React, {useEffect, useState} from 'react';
import CustomButton from "../ui/button";


//styles
import './menu.css';
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getMenu} from "../../redux/slice/menu";
import {deleteFood, fetchFood} from "../../redux/slice/food";
import {useNavigate, useSearchParams} from "react-router-dom";
import {apiToken} from "../../axios";

const MenuPage = () => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch()
    const {data} = useAppSelector(state => state.menu)
    const {data: foods} = useAppSelector(state => state.food)
    const [itemId, setItemId] = useState(searchParams.get('menu') || '');
    const [foodParams, setFoodParams] = useState({
        menu: ''
    });


    useEffect(() => {
        dispatch(getMenu())
    }, [dispatch]);

    useEffect(() => {
        setFoodParams({menu: itemId})
    }, [dispatch, itemId]);


    useEffect(() => {
        dispatch(fetchFood(foodParams))
    }, [dispatch, foodParams]);

    function calculateTotalFoods(data: any) {
        if (data && data.results && data.results.length > 0) {
            return data.results.reduce((sum: any, item: any) => sum + item.foods.length, 0);
        } else {
            return 0;
        }
    }

    const handleDeleteFood = (id: any) => {
        apiToken.delete(`/menu/foods/${id}/`)
            .then((res) => {
                if (res.status === 204) {
                    dispatch(deleteFood(id))
                }
            }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <section className='menu'>
            <div className='menu__items'>
                <div className='menu__items__title'>
                    <h4>Меню</h4>
                    <CustomButton variant={'primary'} className='menu__items__button'>Добавить</CustomButton>
                </div>
                <div className='menu__items__cards'>
                    <CustomButton
                        onClick={() => {
                            setItemId('')
                            navigate(`/admin/menu/`)
                        }}
                        variant={'secondary'}
                        className='menu__items__card'
                    >
                        <div>
                            <p>Все</p>
                            <p>Кол-во: <span>{calculateTotalFoods(data)}</span></p>
                        </div>
                    </CustomButton>
                    {data?.results.map((item: any) => (
                        <CustomButton
                            onClick={() => {
                                setItemId(item.id)
                                navigate(`/admin/menu/?menu=${item.id}`)
                            }}
                            variant={'secondary'}
                            key={item.id}
                            className='menu__items__card'
                        >
                            <div>
                                <p>{item.name}</p>
                                <p>Кол-во: <span>{item.foods.length}</span></p>
                            </div>
                        </CustomButton>
                    ))}
                </div>
                <div className='menu__items__foods'>
                    {foods?.results?.map((item: any) => {
                        let food = item.sizes.find((size: any) => size.price === item.sizes[0].price)
                            return (
                                    <div
                                        key={item.id}
                                        className='menu__items__food'
                                    >
                                        <div className='menu__items__food__img'>
                                            <img src={item.image} alt=""/>
                                        </div>
                                        <div className='menu__items__food__info'>
                                            <h4>{item.name}</h4>
                                            <p>Описание: <span>{item.description}</span></p>
                                            <p>Кол-во: <span>{item.sizes.length}</span></p>
                                            <p>Цена: <span>{ item.id === food?.id ? food?.price : item.sizes[0].price}</span></p>
                                        </div>
                                        <div className='menu__items__food__btns'>
                                            <CustomButton
                                                variant={'primary'}
                                            >
                                                Редактировать
                                            </CustomButton>
                                            <CustomButton
                                                onClick={() => handleDeleteFood(item.id)}
                                                variant={'danger'}
                                            >
                                                Удалить
                                            </CustomButton>
                                        </div>
                                    </div>
                                )
                    })}
                </div>
            </div>
        </section>
    );
};

export default MenuPage;
