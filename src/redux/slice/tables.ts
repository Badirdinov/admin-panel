import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiToken } from "../../axios";
import { ITablesTypes } from "../../types";


const initialState : ITablesTypes = {
    data     : null,
    isLoading: false,
    error    : false
}

export const fetchTables = createAsyncThunk(
  "tables/fetchTables",
  async () => {
      try {
          const response = await apiToken.get('/menu/tables/?pagination=false')
          return response.data
      }
      catch ( error ) {
          console.log(error)
      }
  }
)


const tablesSlice = createSlice({
    name         : 'tables',
    initialState,
    reducers     : {
        deleteTable: (state, action) => {
            if ( state.data ) {
                state.data.results = state.data.results.filter((item) => item.id !== action.payload)
            }
        }
    },
    extraReducers: builder => {
        builder
          .addCase(fetchTables.pending, (state) => {
              state.isLoading = true
          })
          .addCase(fetchTables.fulfilled, (state, action) => {
              state.isLoading = false
              state.data = action.payload
          })
          .addCase(fetchTables.rejected, (state) => {
              state.isLoading = false
              state.error = true
              state.data = null
          })
    }
})

export const { actions } = tablesSlice

export default tablesSlice.reducer