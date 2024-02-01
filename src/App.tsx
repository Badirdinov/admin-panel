import React from 'react';
import {Route, Routes} from "react-router-dom";
import Dashboard from "./components/dashboard";
import AllOrders from "./components/dashboard/all-orders";
import Staff from "./components/dashboard/staff";
import Reports from "./components/dashboard/reports";
import RegisterPage from "./components/auth/register";
import LoginPage from "./components/auth/login";
import OldPage from "./components/old-page";
import Adminstrator from "./components/admin-layout";
import MenuPage from "./components/menu";
import CategoryPage from "./components/category";

function App() {
    return (
        <Routes>
            <Route path='/' element={<OldPage/>}/>
            <Route path='/admin' element={<Adminstrator/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='/admin/reports' element={<Reports/>}/>
                <Route path='/admin/all-orders' element={<AllOrders/>}/>
                <Route path='/admin/staff' element={<Staff/>}/>
                <Route path='/admin/menu' element={<MenuPage/>}/>
                <Route path='/admin/category' element={<CategoryPage/>}/>
            </Route>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
        </Routes>
    );
}

export default App;
