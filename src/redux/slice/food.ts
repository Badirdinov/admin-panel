import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {apiToken} from "../../axios";


const initialState = {
    data: null as any,
    isLoading: false,
    error: false,
}


export const fetchFood = createAsyncThunk(
    'food/fetchFood',
    async ({id}: any) => {
        try {
            const response = await apiToken.get(`/menu/foods/${id}/`)
            return response.data
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
)



const getFood = createSlice({
    name: 'food',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchFood.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(fetchFood.fulfilled, (state, action) => {
                state.isLoading = false
                state.data = action.payload
            })
            .addCase(fetchFood.rejected, (state, action) => {
                state.isLoading = false
                state.error = true
            })
    }
})

export default getFood.reducer