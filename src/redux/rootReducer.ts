import { combineReducers } from "@reduxjs/toolkit";

import userSlice from './userSlice'
import authSlice from './authSlice'
import categorySlice from './categorySlice'
import homeSlice from './homeSlice'
import comicSlice from './comicSlice'
import chapterSlice from './chapterSlice'

const rootReducer = combineReducers({
    authSlice,
    userSlice,
    categorySlice,
    homeSlice,
    comicSlice,
    chapterSlice
})

export default rootReducer