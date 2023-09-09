import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    IForgotPassBody,
    ILoginBody,
    IRegisterBody,
    IVerifyOtpBody
} from '@models'
import { helper } from '@utils'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import { sendRequest } from '@api'
import { navigate, reset } from '@navigations'
import { AccessToken, LoginManager } from 'react-native-fbsdk-next'
import { AppDispatch, RootState } from './store'
import { setDocumentInfo } from './userSlice'

export const loginAction = createAsyncThunk<any, ILoginBody, { dispatch: AppDispatch }>(
    'auth/login', async (body: ILoginBody, { dispatch }) => {
        let path = 'api/user/login'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            } else if (respone.needVerifyOtp) {
                helper.hideLoading()
                navigate('otpVerification', {
                    verifyAction: 'login',
                    message: respone.message,
                    email: respone.email
                })
                return false
            }
            const data = respone.data
            dispatch(setDocumentInfo({
                fullName: data.fullName,
                id: data.id,
                image: data.image,
                nickName: data.nickName,
                email: data.email
            }))
            return data.accessToken
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const registerAction = createAsyncThunk(
    'auth/register', async (body: IRegisterBody) => {
        let path = 'api/user/register'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            }
            navigate('otpVerification', {
                verifyAction: 'register',
                message: respone.message,
                email: respone.email
            })
            return true
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const loginVerifyOtpAction = createAsyncThunk<any, IVerifyOtpBody, { dispatch: AppDispatch }>(
    'auth/loginVerifyOtp', async (body: IVerifyOtpBody, { dispatch }) => {
        let path = 'api/user/loginVerifyOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            }
            const data = respone.data
            dispatch(setDocumentInfo({
                fullName: data.fullName,
                id: data.id,
                image: data.image,
                nickName: data.nickName,
                email: data.email
            }))
            return data.accessToken
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const registerVerifyOtpAction = createAsyncThunk<any, IVerifyOtpBody, { dispatch: AppDispatch }>(
    'auth/registerVerifyOtp', async (body: IVerifyOtpBody, { dispatch }) => {
        let path = 'api/user/registerVerifyOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            }
            const data = respone.data
            dispatch(setDocumentInfo({
                fullName: data.fullName,
                id: data.id,
                image: data.image,
                nickName: data.nickName,
                email: data.email
            }))
            return data.accessToken
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const loginWithGoogleAction = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
    'auth/loginWithGoogle',
    async (_, { dispatch }) => {
        let path = 'api/user/loginWithGoogle'
        try {
            await GoogleSignin.hasPlayServices()
            const dataSignin = await GoogleSignin.signIn()
            helper.showLoading()
            const googleCredential = auth.GoogleAuthProvider.credential(dataSignin.idToken);
            const userCredential = await auth().signInWithCredential(googleCredential)
            const user = userCredential.user;
            const respone = await sendRequest(path, { idToken: await user.getIdToken() })
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            }
            const data = respone.data
            dispatch(setDocumentInfo({
                fullName: data.fullName,
                id: data.id,
                image: data.image,
                nickName: data.nickName,
                email: data.email
            }))
            return data.accessToken
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)


export const loginWithFacebookAction = createAsyncThunk<any, void, { dispatch: AppDispatch }>(
    'auth/loginWithFacebook',
    async (_, { dispatch }) => {
        let path = 'api/user/loginWithFacebook'
        try {
            await LoginManager.logInWithPermissions(['public_profile', 'email']);
            const tokenData = await AccessToken.getCurrentAccessToken()
            if (!tokenData) return false

            helper.showLoading()
            const facebookCredential = auth.FacebookAuthProvider.credential(tokenData.accessToken)
            const userCredential = await auth().signInWithCredential(facebookCredential)
            const user = userCredential.user

            const respone = await sendRequest(path, { idToken: await user.getIdToken() })

            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            }
            const data = respone.data
            dispatch(setDocumentInfo({
                fullName: data.fullName,
                id: data.id,
                image: data.image,
                nickName: data.nickName,
                email: data.email
            }))
            return data.accessToken
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const forgotPassAction = createAsyncThunk(
    'auth/forgotPass', async (body: IForgotPassBody) => {
        let path = 'api/user/forgotPassword'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            }
            navigate('otpVerification', {
                verifyAction: 'forgotPass',
                message: respone.message,
                email: respone.email
            })
            return
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const forgotPassVerifyOtpAction = createAsyncThunk(
    'auth/forgotPassVerifyOtp', async (body: IVerifyOtpBody) => {
        let path = 'api/user/forgotPasswordVerifyOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            }
            helper.showSuccessMsg(
                respone.message,
                () => {
                    reset([{ name: 'login', params: { email: body.email } }])
                })
            return
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const resendOtp = createAsyncThunk(
    'auth/resendOtpt', async (body: { email: string },) => {
        let path = 'api/user/resendOtp'
        try {
            helper.showLoading()
            const respone = await sendRequest(path, body)
            helper.hideLoading()
            if (respone.err != 200) {
                helper.showErrorMsg(respone.message)
                return false
            }
            return
        } catch (error: any) {
            helper.hideLoading()
            return false
        }
    }
)

export const logoutAction = createAsyncThunk<void, void, { state: RootState }>(
    'auth/logout', async (_, { getState }) => {
        try {
            let loginSource = getState().authSlice.loginSource
            if (loginSource == 'facebook')
                LoginManager?.logOut()
            else if (loginSource == 'google')
                await GoogleSignin.signOut()
            return
        } catch (error: any) {
            return
        }
    }
)

export interface IAuthState {
    token: string,
    loginSource: 'google' | 'facebook' | 'email'
}

const initialState: IAuthState = {
    token: '',
    loginSource: 'email'
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(loginWithGoogleAction.fulfilled, (state, action) => {
                if (!action.payload) return
                state.token = action.payload
                state.loginSource = 'google'
            })
            .addCase(loginWithFacebookAction.fulfilled, (state, action) => {
                if (!action.payload) return
                state.token = action.payload
                state.loginSource = 'facebook'
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                if (!action.payload) return
                state.token = action.payload
            })
            .addCase(loginVerifyOtpAction.fulfilled, (state, action) => {
                if (!action.payload) return
                state.token = action.payload
            })
            .addCase(registerVerifyOtpAction.fulfilled, (state, action) => {
                if (!action.payload) return
                state.token = action.payload
            })
            .addCase(logoutAction.fulfilled, (state, action) => {
                state.token = ''
                state.loginSource = 'email'
            })
    },
})

export default authSlice.reducer