import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './userSlice'
import authSlice from './authSlice'

const rootReducer = combineReducers({
    authSlice,
    userSlice
})

export default rootReducer