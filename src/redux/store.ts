import {configureStore,} from '@reduxjs/toolkit'
import {userSlice} from './index'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
const store = configureStore({
    reducer:{
        userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export { store }