import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './userSlice'
import authSlice from './authSlice'
import categorySlice from './categorySlice'

const rootReducer = combineReducers({
    authSlice,
    userSlice,
    categorySlice
})

export default rootReducer