import React, {useEffect} from 'react';
import CustomButton from "../ui/button";


//styles
import './menu.css';
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {getMenu} from "../../redux/slice/menu";

const MenuPage = () => {

    const dispatch = useAppDispatch()
    const {data} = useAppSelector(state => state.menu)


    useEffect(() => {
        dispatch(getMenu())
    }, [dispatch]);

    console.log(data)

    function calculateTotalFoods(data: any) {
        if (data && data.results && data.results.length > 0) {
            // Используем reduce для суммирования количества продуктов из каждого результата
            const totalFoods = data.results.reduce((sum: any, item: any) => sum + item.foods.length, 0);
            return totalFoods;
        } else {
            return 0; // Возвращаем 0, если данные не определены или не содержат результатов
        }
    }

    return (
        <section className='menu'>
            <div className='menu__items'>
                <div className='menu__items__title'>
                    <h4>Меню</h4>
                    <CustomButton variant={'primary'} className='menu__items__button'>Добавить</CustomButton>
                </div>
                <div className='menu__items__cards'>
                    <CustomButton variant={'secondary'} className='menu__items__card'>
                        <div>
                            <p>Все</p>
                            <p>Кол-во: <span>{calculateTotalFoods(data)}</span></p>
                        </div>
                    </CustomButton>
                    {data?.results.map((item: any) => (
                        <CustomButton variant={'secondary'} key={item.id} className='menu__items__card'>
                            <div>
                                <p>{item.name}</p>
                                <p>Кол-во: <span>{item.foods.length}</span></p>
                            </div>
                        </CustomButton>
                    ))}
                </div>
                <div className='menu__items__foods'>

                </div>
            </div>
        </section>
    );
};

export default MenuPage;
