import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiToken} from "../../axios";


const initialState = {
    data: null as any,
    isLoading: false,
    error: false
}


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async () => {
        try {
            const response = await apiToken.get('/auth/users/')
            console.log(response.data)
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
);


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.error = true
            })
    }
})

export default usersSlice.reducer