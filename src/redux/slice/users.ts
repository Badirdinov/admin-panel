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
    reducers: {
        addUser: (state, action) => {
            state.data = {...state.data, ...action.payload}
        },
        editUser: (state, action) => {
            state.data.results = state.data.results.map((item: any) => {
                if(item.id === action.payload.id){
                    return {
                        ...item,
                        ...action.payload.valueEditInput,
                    }
                }
                return item
            })
        },
        deleteUser: (state, action) => {
            state.data.results = state.data.results.filter((user: any) => user.id !== action.payload.id)
        }
    },
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

export const {addUser, editUser, deleteUser} = usersSlice.actions
export default usersSlice.reducer