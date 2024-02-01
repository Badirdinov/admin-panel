import React from 'react';
import {Link, useLocation} from "react-router-dom";


const MenuList = [
    {
        id: 1,
        path: '/admin/category',
        name: 'Категории'
    },
    {
        id: 2,
        path: '/admin/menu',
        name: 'Блюда'
    },
    {
        id: 3,
        path: '/admin/staff',
        name: 'Персонал'
    },
    {
        id: 4,
        path: '/admin/reports',
        name: 'Отчеты'
    },
    {
        id: 5,
        path: '/admin/all-orders',
        name: 'Все заказы'
    },


]


const Sidebar = () => {

    let {pathname} = useLocation();

    return (
        <div className='sidebar__items'>
            <div className='sidebar__item'>
                <Link to='/admin' className='sidebar__logo'>
                    LOGO
                </Link>
                <ul className='sidebar__menu'>
                    {MenuList.map((menu) => (
                        <Link
                            key={menu.id}
                            to={menu.path}
                            className={pathname.startsWith(menu.path) ? 'active' : ''}
                        >
                            {menu.name}
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
