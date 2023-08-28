import { configureStore } from "@reduxjs/toolkit";
import configurationReducer from './configurationSlice'
import jobsReducer from './jobsSlice'
import usersReducer from './userSlice'

export const store = configureStore({
    reducer: {
        configuration: configurationReducer,
        jobs: jobsReducer,
        user: usersReducer
    }
})