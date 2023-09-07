import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IForgotPassBody, ILoginBody, IRegisterBody, IVerifyOtpBody } from '@models'
import { helper } from '@utils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { sendRequest } from '@api'
import { navigate, replace, reset } from '@navigations'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'

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
                helper.showErrorMsg(respone.message)
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

export const registerAction = createAsyncThunk(
    'auth/register', async (body: IRegisterBody, { rejectWithValue }) => {
        let path = 'api/user/register'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return rejectWithValue(respone.message)
            }
            navigate('otpVerification', {
                verifyAction: 'register',
                message: respone.message,
                email: respone.email
            })
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
                helper.showErrorMsg(respone.message)
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
    'auth/registerVerifyOtp', async (body: IVerifyOtpBody, { rejectWithValue }) => {
        let path = 'api/user/registerVerifyOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return rejectWithValue(respone.message)
            }
            reset([{ name: 'home' }])
            helper.showSuccessMsg(respone.message)
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
                helper.showErrorMsg(respone.message)
                return rejectWithValue(respone.message)
            }
            return respone.data
        } catch (error: any) {
            helper.hideLoading()
            return rejectWithValue(error.message)
        }
    }
)


export const loginWithFacebookAction = createAsyncThunk(
    'auth/loginWithFacebook',
    async (_, { rejectWithValue }) => {
        let path = 'api/user/loginWithFacebook'
        try {
            await LoginManager.logInWithPermissions(['public_profile', 'email']);
            const data = await AccessToken.getCurrentAccessToken()
            if (!data) return rejectWithValue('Invalid accesstoken')

            helper.showLoading()
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken)
            const userCredential = await auth().signInWithCredential(facebookCredential)
            const user = userCredential.user
            console.log(user)
            console.log(await user.getIdToken())

            const respone = await sendRequest(path, { idToken: await user.getIdToken() })
            helper.hideLoading()

            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
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
    'auth/forgotPass', async (body: IForgotPassBody, { rejectWithValue }) => {
        let path = 'api/user/forgotPassword'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return rejectWithValue(respone.message)
            }
            navigate('otpVerification', {
                verifyAction: 'forgotPass',
                message: respone.message,
                email: respone.email
            })
            return
        } catch (error: any) {
            helper.hideLoading()
            return rejectWithValue(error.message)
        }
    }
)

export const forgotPassVerifyOtpAction = createAsyncThunk(
    'auth/forgotPassVerifyOtp', async (body: IVerifyOtpBody, { rejectWithValue }) => {
        let path = 'api/user/forgotPasswordVerifyOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return rejectWithValue(respone.message)
            }
            helper.showSuccessMsg(
                respone.message,
                () => {
                    reset([{ name: 'login', params: { email: body.email } }])
                })
            return
        } catch (error: any) {
            helper.hideLoading()
            return rejectWithValue(error.message)
        }
    }
)

export const resendOtp = createAsyncThunk(
    'auth/resendOtpt', async (body: { email: string }, { rejectWithValue }) => {
        let path = 'api/user/resendOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            console.log(respone)
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return rejectWithValue(respone.message)
            }
            return
        } catch (error: any) {
            helper.hideLoading()
            return rejectWithValue(error.message)
        }
    }
)

export const logoutAction = createAsyncThunk(
    'auth/logout', async (_, { rejectWithValue }) => {
        try {
            helper.showLoading()
            LoginManager.logOut()
            await GoogleSignin.signOut()
            reset([{ name: 'login' }])
            helper.hideLoading()
            return initialState
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
                state.token = action.payload?.accessToken
                reset([{ name: 'home' }])
            })
            .addCase(loginWithGoogleAction.rejected, (_, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(loginWithFacebookAction.fulfilled, (state, action) => {
                state.token = action.payload?.accessToken
                reset([{ name: 'home' }])
            })
            .addCase(loginWithFacebookAction.rejected, (_, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.token = action.payload?.accessToken
            })
            .addCase(loginAction.rejected, (_, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(loginVerifyOtpAction.fulfilled, (state, action) => {
                state.token = action.payload?.accessToken
                reset([{ name: 'home' }])
            })
            .addCase(loginVerifyOtpAction.rejected, (_, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(registerAction.rejected, (_, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(registerVerifyOtpAction.fulfilled, (state, action) => {
                state.token = action.payload?.accessToken
            })
            .addCase(registerVerifyOtpAction.rejected, (_, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(forgotPassAction.rejected, (_, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(forgotPassVerifyOtpAction.rejected, (_, action) => {
                console.log('[Error at authSlice]', action.payload)
            })
            .addCase(resendOtp.rejected, (_, action) => {
                console.log('Error at authSlice', action.payload)
            })
            .addCase(logoutAction.fulfilled, (state, action) => {
                if (action.payload)
                    state = action.payload
            })
            .addCase(logoutAction.rejected, (_, action) => {
                console.log('Error at authSlice', action.payload)
            })
    },
})

export default authSlice.reducer