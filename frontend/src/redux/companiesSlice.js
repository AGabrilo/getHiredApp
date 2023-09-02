import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    status: 'idle',
    error: null
};

export const fetchCompany = createAsyncThunk('company/fetchCompany', async () => {

    const response = await fetch('http://localhost:3001/api/company', {
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((response) => response.json())
    return response
})


export const companiesSlice = createSlice({
    name: 'companies',
    initialState,
    //the reducers field lets us to define reducers and generate actions
    reducers: {

    },
    //extraReducers lets the slice handle actions defined elsewhere
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompany.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCompany.rejected, (state) => {
                console.log('Failed to load Job!')
                state.status = 'failed';
            })
            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.status = 'complete';
                state.data = action.payload;
            })
    }
})

export const selectCompaniesConf = (state)=> state.companies.data;

export default companiesSlice.reducer;