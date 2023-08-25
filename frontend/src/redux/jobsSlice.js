import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: 'idle',
    error: null
};

export const fetchJob = createAsyncThunk('job/fetchJob', async () => {

    const response = await fetch('http://localhost:3001/api/job', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => response.json())
    return response

})


export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    //the reducers field lets us to define reducers and generate actions
    reducers: {

    },
    //extraReducers lets the slice handle actions defined elsewhere
    extraReducers: (builder) => {
        builder
            .addCase(fetchJob.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchJob.rejected, (state) => {
                console.log('Failed to load Job!')
                state.status = 'failed';
            })
            .addCase(fetchJob.fulfilled, (state, action) => {
                state.status = 'complete';
                state.data = action.payload;
            })
    }
})

export const selectJobsConf = (state)=> state.jobs.data;

export default jobsSlice.reducer;