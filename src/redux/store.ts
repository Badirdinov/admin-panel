import { configureStore } from '@reduxjs/toolkit'
import users from "./slice/users";
import user from "./slice/user";

export const store = configureStore({
    reducer: {
        users: users,
        user: user
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch