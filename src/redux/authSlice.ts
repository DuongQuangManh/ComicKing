import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILoginBody, IRegisterBody, IVerifyOtpBody } from '@models'
import { helper } from '@utils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { sendRequest } from '@api'
import { navigate } from '@navigations'

export interface IAuthState {
    token: string
}

const initialState: IAuthState = {
    token: '',
}

export const loginAction = createAsyncThunk(
    'auth/login', async (body: ILoginBody, { rejectWithValue }) => {
        let path = 'api/user/login'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showMsg(respone.message)
                return rejectWithValue(respone.message)
            } else if (respone.needVerifyOtp) {
                navigate('otpVerification', { verifyAction: 'login', message: respone.message, email: respone.email })
            }
            return respone.data
        } catch (error: any) {
            helper.hideLoading()
            return rejectWithValue(error.message)
        }
    }
)

export const logoutAction = () => {

}

export const registerAction = createAsyncThunk(
    'auth/register', async (body: IRegisterBody, { rejectWithValue }) => {
        let path = 'api/user/register'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showMsg(respone.message)
                return rejectWithValue(respone.message)
            }
            navigate('otpVerification', { verifyAction: 'register', message: respone.message, email: respone.email })
            return
        } catch (error: any) {
            helper.hideLoading()
            return rejectWithValue(error.message)
        }
    }
)

export const loginVerifyOtpAction = createAsyncThunk(
    'auth/loginVerifyOtp', async (body: IVerifyOtpBody, { rejectWithValue }) => {
        let path = 'api/user/loginVerifyOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
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

export const registerVerifyOtpAction = createAsyncThunk(
    'auth/registerVerifyOtp', async (body: IRegisterBody, { rejectWithValue }) => {
        let path = 'api/user/registerVerifyOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
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

export const loginWithGoogleAction = createAsyncThunk(
    'auth/loginWithGoogle',
    async (_, { rejectWithValue }) => {
        let path = 'api/user/loginWithGoogle'
        try {
            await GoogleSignin.hasPlayServices()
            const dataSignin = await GoogleSignin.signIn()
            helper.showLoading()
            const googleCredential = auth.GoogleAuthProvider.credential(dataSignin.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential)
            const user = userCredential.user;
            const respone = await sendRequest(path, { idToken: await user.getIdToken() })
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

export const forgotPassAction = createAsyncThunk(
    'auth/forgotPass', async (body, { rejectWithValue }) => {

    }
)

export const forgotPassVerifyOtpAction = createAsyncThunk(
    'auth/forgotPassVerifyOtp', async (body: IVerifyOtpBody, { rejectWithValue }) => {

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
                state.token = action.payload?.accessToken
            })
            .addCase(loginWithGoogleAction.rejected, (state, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.token = action.payload?.accessToken
            })
            .addCase(loginAction.rejected, (state, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(loginVerifyOtpAction.fulfilled, (state, action) => {

            })
            .addCase(loginVerifyOtpAction.rejected, (state, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(registerAction.fulfilled, (state, action) => {

            })
            .addCase(registerAction.rejected, (state, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(registerVerifyOtpAction.fulfilled, (state, action) => {

            })
            .addCase(registerVerifyOtpAction.rejected, (state, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(forgotPassAction.fulfilled, (state, action) => {

            })
            .addCase(forgotPassAction.rejected, (state, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(forgotPassVerifyOtpAction.fulfilled, (state, action) => {

            })
            .addCase(forgotPassVerifyOtpAction.rejected, (state, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
    },
})

export default authSlice.reducer