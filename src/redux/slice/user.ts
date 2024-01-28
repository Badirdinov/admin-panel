import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiToken} from "../../axios";
import {IUserInitialTypes, IUserTypes} from "../../types";


const initialState = {
    data: null as IUserTypes | null,
    isLoading: false,
    error: false
}


export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async ({id}: any) => {
        try {
            const response = await apiToken.get(`/auth/users/${id}`)
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.error = true
            })
    }
})


export default userSlice.reducer