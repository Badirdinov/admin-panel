import {Outlet, redirect} from 'react-router-dom';

import Header from "../../header";
import Sidebar from "../../sidebar";
import Dashboard from "../../dashboard";


const AdminLayout = () => {

    const token = localStorage.getItem('token')

    return (
        <div className="wrapper">
            <div className='sidebar'>
                <Sidebar/>
            </div>
            <div className="header">
                <Header/>
            </div>
            <div className="main">
                <Outlet/>
            </div>
        </div>
    );
};

export default AdminLayout;