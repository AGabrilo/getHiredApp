import { configureStore } from "@reduxjs/toolkit";
import configurationReducer from './configurationSlice'
import jobsReducer from './jobsSlice'
import userReducer from './userSlice'

export const store = configureStore({
    reducer: {
        configuration: configurationReducer,
        jobs: jobsReducer,
        user: userReducer
    }
})