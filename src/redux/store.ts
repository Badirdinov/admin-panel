import { configureStore } from '@reduxjs/toolkit'
import users from "./slice/users";
import getMenu from "./slice/menu";
import food from "./slice/food";
import tables from "./slice/tables";


export const store = configureStore({
    reducer: {
        users: users,
        menu: getMenu,
        food: food,
        tables: tables
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch