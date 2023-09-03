import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILoginWithGoogleBody } from '@models'
import { authDataServices } from '@api'
import { helper } from '@utils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

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
    async (_, { rejectWithValue }) => {
        try {
            helper.showLoading()
            await GoogleSignin.hasPlayServices()
            const data = await GoogleSignin.signIn()
            const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential)
            const user = userCredential.user;

            const response = await authDataServices.loginWithGoogle({ idToken: await user.getIdToken() })
            helper.hideLoading()

        } catch (error: any) {
            helper.hideLoading()
            console.log('[Error at authslice] : ', error)
        }
    }
)

export default authSlice.reducer