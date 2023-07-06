import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: 'idle',
    error: null
};

export const fetchConfiguration = createAsyncThunk('configuration/fetchConfiguration', async () => {

    const response = await fetch('http://localhost:3001/api/configuration', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            // 'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => response.json())

    return response

})


export const configurationSlice = createSlice({
    name: 'configuration',
    initialState,
    //the reducers field lets us to define reducers and generate actions
    reducers: {

    },
    //extraReducers lets the slice handle actions defined elsewhere
    extraReducers: (builder) => {
        builder
            .addCase(fetchConfiguration.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchConfiguration.rejected, (state) => {
                console.log('Failed to load configuration!')
                state.status = 'failed';
            })
            .addCase(fetchConfiguration.fulfilled, (state, action) => {
                state.status = 'complete';
                state.data = action.payload;
            })
    }
})

export const selectJobTypesConf = (state)=> state.configuration.data.jobType;
export const selectSkillsConf = (state)=> state.configuration.data.skill;
export const selectWorkLocationsConf = (state)=> state.configuration.data.workLocation;
export const selectApplicationStatusConf = (state)=> state.configuration.data.applicationStatus;



export default configurationSlice.reducer;