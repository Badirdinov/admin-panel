import React from 'react';
import {Logo} from "../../assets/svg";
import {Link, useLocation, useNavigate, useRoutes} from "react-router-dom";


const MenuList = [
    {
        id: 1,
        path: '/admin/reports',
        name: 'Отчеты'
    },
    {
        id: 2,
        path: '/admin/all-orders',
        name: 'Все заказы'
    },
    {
        id: 3,
        path: '/admin/food',
        name: 'Блюда'
    },
    {
        id: 4,
        path: '/admin/staff',
        name: 'Персонал'
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
                            className={pathname === menu.path ? 'active' : ''}
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
