import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiToken } from "../../axios";


const initialState = {
    data     : null as any,
    isLoading: false,
    error    : false,
}

export const getMenu = createAsyncThunk(
  'menu/getMenu',
  async () => {
      try {
          const response = await apiToken.get('/menu/')
          return response.data
      }
      catch ( error ) {
          console.error(error);
          throw error;
      }
  }
)


const fetchMenu = createSlice({
    name         : 'menu',
    initialState,
    reducers     : {
        addMenu   : (state, action) => {
            state.data = { ...state.data, ...action.payload }
        },
        editMenu  : (state, action) => {
            state.data.results = state.data.results.map((item : any) => {
                if ( item.id === action.payload.id ) {
                    return {
                        ...item,
                        ...action.payload.editInputValue,
                    }
                }
                return item
            })
        },
        deleteMenu: (state, action) => {
            state.data.results = state.data.results.filter((item : any) => item.id !== action.payload)
        }
    },
    extraReducers: builder => {
        builder
          .addCase(getMenu.pending, (state) => {
              state.isLoading = true
          })
          .addCase(getMenu.fulfilled, (state, action) => {
              state.isLoading = false
              state.data = action.payload
          })
          .addCase(getMenu.rejected, (state) => {
              state.isLoading = false
              state.error = true
          })
    },
})


export const { addMenu, editMenu, deleteMenu } = fetchMenu.actions
export default fetchMenu.reducer