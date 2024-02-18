import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiToken } from "../../axios";


const initialState = {
    data     : null as any,
    isLoading: false,
    error    : false,
}


export const fetchFood = createAsyncThunk(
  'food/fetchFood',
  async (params? : Object) => {
      try {
          const response = await apiToken.get(`/menu/foods/`, {
              params: { ...params }
          })
          return response.data
      }
      catch ( error ) {
          console.error(error);
          throw error;
      }
  }
)


const getFood = createSlice({
    name         : 'food',
    initialState,
    reducers     : {
        deleteFood: (state, action) => {
            state.data.results = state.data.results.filter((food : any) => food.id !== action.payload)
        },
        addFood   : (state, action) => {
            state.data.results = [ ...state.data.results, action.payload ]
        }
    },
    extraReducers: builder => {
        builder
          .addCase(fetchFood.pending, (state) => {
              state.isLoading = true
          })
          .addCase(fetchFood.fulfilled, (state, action) => {
              state.isLoading = false
              state.data = action.payload
          })
          .addCase(fetchFood.rejected, (state) => {
              state.isLoading = false
              state.error = true
          })
    }
})

export const { addFood, deleteFood } = getFood.actions
export default getFood.reducer