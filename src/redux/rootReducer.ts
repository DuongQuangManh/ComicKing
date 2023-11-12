import {combineReducers} from '@reduxjs/toolkit';

import userSlice from './userSlice';
import authSlice from './authSlice';
import categorySlice from './categorySlice';
import homeSlice from './homeSlice';
import comicSlice from './comicSlice';
import chapterSlice from './chapterSlice';
import levelSlice from './levelSlice';
import paymentSlice from './paymentSlice';
import attendanceSlice from './attendanceSlice';

const rootReducer = combineReducers({
  authSlice,
  userSlice,
  categorySlice,
  homeSlice,
  comicSlice,
  chapterSlice,
  levelSlice,
  paymentSlice,
  attendanceSlice,
});

export default rootReducer;
