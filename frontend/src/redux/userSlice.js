import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: 'idle',
    error: null
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {

    const response = await fetch(`http://localhost:3001/api/user/${localStorage.getItem('id')}`, {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => response.json())
    return response

})


export const userSlice = createSlice({
    name: 'user',
    initialState,
    //the reducers field lets us to define reducers and generate actions
    reducers: {

    },
    //extraReducers lets the slice handle actions defined elsewhere
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.rejected, (state) => {
                console.log('Failed to load User!')
                state.status = 'failed';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'complete';
                state.data = action.payload;
            })
    }
})

export const selectUserConf = (state)=> state.user.data;

export default userSlice.reducer;