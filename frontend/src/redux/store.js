import { configureStore } from "@reduxjs/toolkit";
import configurationReducer from './configurationSlice'
import jobsReducer from './jobsSlice'
import usersReducer from './userSlice'
import companiesReducer from './companiesSlice'

export const store = configureStore({
    reducer: {
        configuration: configurationReducer,
        jobs: jobsReducer,
        user: usersReducer,
        companies: companiesReducer
    }
})