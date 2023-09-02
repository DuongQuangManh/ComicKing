import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {ILoginWithGoogleBody} from '@models'
import {authDataServices} from '@api'

export interface IAuthState {
    token: string
}

const initialState: IAuthState = {
    token: '',

}

const authSlice = createSlice({
    name: "authState",
    initialState,
    reducers: {}
})

export const loginAction = () => {

}

export const logoutAction = () => {

}

export const registerAction = () => {

}

export const loginVerifyOtpAction = () => {
    
}

export const registerVerifyOtpAction = () => {

}

export const loginWithGoogleAction = createAsyncThunk(
    'auth/loginWithGoogle',
    async (body: ILoginWithGoogleBody, {rejectWithValue}) => {
        console.log('1234')
        const response = await authDataServices.loginWithGoogle(body)
        
        console.log(response)

    }
)

export default authSlice.reducer