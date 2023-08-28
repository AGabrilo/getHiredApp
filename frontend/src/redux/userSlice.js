import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: 'idle',
    error: null
};

export const fetchUsers = createAsyncThunk('user/fetchUser', async () => {

    const response = await fetch(`http://localhost:3001/api/user`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => response.json())
    return response

})


export const usersSlice = createSlice({
    name: 'user',
    initialState,
    //the reducers field lets us to define reducers and generate actions
    reducers: {

    },
    //extraReducers lets the slice handle actions defined elsewhere
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.rejected, (state) => {
                console.log('Failed to load User!')
                state.status = 'failed';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'complete';
                state.data = action.payload;
            })
    }
})

export const selectUsersConf = (state)=> state.user.data;

export default usersSlice.reducer;