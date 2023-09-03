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
            await GoogleSignin.hasPlayServices()
            const dataSignin = await GoogleSignin.signIn()
            helper.showLoading()
            const googleCredential = auth.GoogleAuthProvider.credential(dataSignin.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential)
            const user = userCredential.user;
            const respone = await authDataServices.loginWithGoogle({ idToken: await user.getIdToken() })
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showMsg(respone.message)
                return rejectWithValue(respone.message)
            }
            return respone.data
        } catch (error: any) {
            helper.hideLoading()
            return rejectWithValue(error.message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
            .addCase(loginWithGoogleAction.fulfilled, (state, action) => {
                state.token = action.payload.accessToken
            })
            .addCase(loginWithGoogleAction.rejected, (state, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
    },
})

export default authSlice.reducer