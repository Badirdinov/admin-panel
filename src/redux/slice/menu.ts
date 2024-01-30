import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiToken} from "../../axios";


const initialState = {
    data: null as any,
    isLoading: false,
    error: false,
}

export const getMenu = createAsyncThunk(
    'menu/getMenu',
    async () => {
        try {
            const response = await apiToken.get('/menu/')
            return response.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)


const fetchMenu = createSlice({
    name: 'menu',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getMenu.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getMenu.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(getMenu.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
    },
})

export default fetchMenu.reducer