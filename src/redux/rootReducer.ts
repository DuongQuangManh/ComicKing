import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './userSlice'
import authSlice from './authSlice'
import categorySlice from './categorySlice'
import homeSlice from './homeSlice'

const rootReducer = combineReducers({
    authSlice,
    userSlice,
    categorySlice,
    homeSlice
})

export default rootReducer