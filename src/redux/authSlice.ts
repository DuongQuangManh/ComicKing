import {Platform} from 'react-native';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  IChangePassBody,
  IForgotPassBody,
  ILoginBody,
  IRegisterBody,
  IVerifyOtpBody,
} from '@models';
import {helper} from '@utils';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {sendRequest} from '@api';
import {navigate, reset} from '@navigations';
import {AccessToken, LoginManager} from 'react-native-fbsdk-next';
import {AppDispatch, RootState} from './store';
import {setDocumentInfo} from './userSlice';
import {getFirebaseToken} from '@notification/index';
import DeviceInfo from 'react-native-device-info';

export const loginAction = createAsyncThunk<
  any,
  ILoginBody,
  {dispatch: AppDispatch; state: RootState}
>('auth/login', async (body: ILoginBody, {dispatch, getState}) => {
  let path = 'api/user/login';
  try {
    helper.showLoading();
    const respone = await sendRequest(path, {
      ...body,
      deviceToken: getState().authSlice.firebaseToken,
    });
    if (respone.err != 200) {
      helper.showErrorMsg(respone.message);
      return false;
    } else if (respone.needVerifyOtp) {
      helper.hideLoading();
      navigate('otpVerification', {
        verifyAction: 'login',
        message: respone.message,
        email: respone.email,
      });
      return false;
    }
    const data = respone.data;
    dispatch(
      setDocumentInfo({
        fullName: data.fullName,
        id: data.id,
        image: data.image,
        nickName: data.nickName,
        email: data.email,
      }),
    );
    helper.getAsset(dispatch, data.id);
    return data.accessToken;
  } catch (error: any) {
    helper.hideLoading();
    return false;
  }
});

export const registerAction = createAsyncThunk(
  'auth/register',
  async (body: IRegisterBody, {getState}: any) => {
    let path = 'api/user/register';
    try {
      helper.showLoading();
      const respone = await sendRequest(path, {
        ...body,
        deviceToken: getState().authSlice.firebaseToken,
      });
      helper.hideLoading();
      if (respone.err != 200) {
        helper.showErrorMsg(respone.message);
        return false;
      }
      navigate('otpVerification', {
        verifyAction: 'register',
        message: respone.message,
        email: respone.email,
      });
      return true;
    } catch (error: any) {
      helper.hideLoading();
      return false;
    }
  },
);

export const loginVerifyOtpAction = createAsyncThunk<
  any,
  IVerifyOtpBody,
  {dispatch: AppDispatch}
>('auth/loginVerifyOtp', async (body: IVerifyOtpBody, {dispatch}) => {
  let path = 'api/user/loginVerifyOtp';
  try {
    helper.showLoading();
    const respone = await sendRequest(path, body);
    if (respone.err != 200) {
      helper.showErrorMsg(respone.message);
      return false;
    }
    const data = respone.data;
    dispatch(
      setDocumentInfo({
        fullName: data.fullName,
        id: data.id,
        image: data.image,
        nickName: data.nickName,
        email: data.email,
      }),
    );
    return data.accessToken;
  } catch (error: any) {
    helper.hideLoading();
    return false;
  }
});

export const registerVerifyOtpAction = createAsyncThunk<
  any,
  IVerifyOtpBody,
  {dispatch: AppDispatch}
>('auth/registerVerifyOtp', async (body: IVerifyOtpBody, {dispatch}) => {
  let path = 'api/user/registerVerifyOtp';
  try {
    helper.showLoading();
    const respone = await sendRequest(path, body);
    helper.hideLoading();
    if (respone.err != 200) {
      helper.showErrorMsg(respone.message);
      return false;
    }
    const data = respone.data;
    dispatch(
      setDocumentInfo({
        fullName: data.fullName,
        id: data.id,
        image: data.image,
        nickName: data.nickName,
        email: data.email,
      }),
    );
    helper.getAsset(dispatch, data.id);
    return data.accessToken;
  } catch (error: any) {
    helper.hideLoading();
    return false;
  }
});

export const loginWithGoogleAction = createAsyncThunk<
  any,
  void,
  {dispatch: AppDispatch; state: RootState}
>('auth/loginWithGoogle', async (_, {dispatch, getState}) => {
  let path = 'api/user/loginWithGoogle';
  try {
    await GoogleSignin.hasPlayServices();
    const dataSignin = await GoogleSignin.signIn();
    helper.showLoading();
    const googleCredential = auth.GoogleAuthProvider.credential(
      dataSignin.idToken,
    );
    const userCredential = await auth().signInWithCredential(googleCredential);
    const user = userCredential.user;
    const respone = await sendRequest(path, {
      idToken: await user.getIdToken(),
      deviceToken: getState().authSlice.firebaseToken,
    });
    if (respone.err != 200) {
      helper.showErrorMsg(respone.message);
      return false;
    }
    const data = respone.data;
    dispatch(
      setDocumentInfo({
        fullName: data.fullName,
        id: data.id,
        image: data.image,
        nickName: data.nickName,
        email: data.email,
      }),
    );
    helper.getAsset(dispatch, data.id);
    return data.accessToken;
  } catch (error: any) {
    helper.hideLoading();
    return false;
  }
});

export const loginWithFacebookAction = createAsyncThunk<
  any,
  void,
  {dispatch: AppDispatch; state: RootState}
>('auth/loginWithFacebook', async (_, {dispatch, getState}) => {
  let path = 'api/user/loginWithFacebook';
  try {
    await LoginManager.logInWithPermissions(['public_profile', 'email']);
    const tokenData = await AccessToken.getCurrentAccessToken();
    if (!tokenData) return false;

    helper.showLoading();
    const facebookCredential = auth.FacebookAuthProvider.credential(
      tokenData.accessToken,
    );
    const userCredential = await auth().signInWithCredential(
      facebookCredential,
    );
    const user = userCredential.user;

    const respone = await sendRequest(path, {
      idToken: await user.getIdToken(),
      deviceToken: getState().authSlice.firebaseToken,
    });

    if (respone.err != 200) {
      helper.showErrorMsg(respone.message);
      return false;
    }
    const data = respone.data;
    dispatch(
      setDocumentInfo({
        fullName: data.fullName,
        id: data.id,
        image: data.image,
        nickName: data.nickName,
        email: data.email,
      }),
    );
    helper.getAsset(dispatch, data.id);
    return data.accessToken;
  } catch (error: any) {
    helper.hideLoading();
    return false;
  }
});

export const forgotPassAction = createAsyncThunk(
  'auth/forgotPass',
  async (body: IForgotPassBody) => {
    let path = 'api/user/forgotPassword';
    try {
      helper.showLoading();
      const respone = await sendRequest(path, body);
      helper.hideLoading();
      if (respone.err != 200) {
        helper.showErrorMsg(respone.message);
        return false;
      }
      navigate('otpVerification', {
        verifyAction: 'forgotPass',
        message: respone.message,
        email: respone.email,
      });
      return;
    } catch (error: any) {
      helper.hideLoading();
      return false;
    }
  },
);

export const forgotPassVerifyOtpAction = createAsyncThunk(
  'auth/forgotPassVerifyOtp',
  async (body: IVerifyOtpBody) => {
    let path = 'api/user/forgotPasswordVerifyOtp';
    try {
      helper.showLoading();
      const respone = await sendRequest(path, body);
      helper.hideLoading();
      if (respone.err != 200) {
        helper.showErrorMsg(respone.message);
        return false;
      }
      // helper.showSuccessMsg(
      //     respone.message,
      //     () => {
      //         reset([{ name: 'login', params: { email: body.email } }])
      //     })
      navigate('success', {message: 'forgotPassSuccess'});
    } catch (error: any) {
      helper.hideLoading();
      return false;
    }
  },
);

export const resendOtp = createAsyncThunk(
  'auth/resendOtpt',
  async (body: {email: string}) => {
    let path = 'api/user/resendOtp';
    try {
      helper.showLoading();
      const respone = await sendRequest(path, body);
      helper.hideLoading();
      if (respone.err != 200) {
        helper.showErrorMsg(respone.message);
        return false;
      }
      return;
    } catch (error: any) {
      helper.hideLoading();
      return false;
    }
  },
);

export const logoutAction = createAsyncThunk<
  void,
  void,
  {state: RootState; dispatch: AppDispatch}
>('auth/logout', async (_, {getState, dispatch}) => {
  try {
    helper.showLoading();
    let loginSource = getState().authSlice.loginSource;
    if (loginSource == 'facebook') {
      LoginManager?.logOut();
    } else if (loginSource == 'google') {
      await GoogleSignin.signOut();
    }
    let path = 'api/user/logout';
    await sendRequest(path, {userId: getState().userSlice.document?.id});
    helper.hideLoading();
  } catch (error: any) {
    helper.hideLoading();
  }
  dispatch(resetTokenWhenLogout(''));
  reset([{name: 'login'}]);
});

//POST /api/user/changePassword': 'AuthController.changePassword',
//'POST /api/user/changePasswordVerifyOtp': 'AuthController.changePasswordVerifyOtp',
export const changePassAction = createAsyncThunk(
  'auth/changePassAction',
  async (body: IChangePassBody) => {
    let path = 'api/user/changePassword';
    try {
      helper.showLoading();
      const res = await sendRequest(path, body);

      if (res.err != 200) {
        helper.showErrorMsg(res.message);
        return false;
      } else {
        helper.hideLoading();
        navigate('otpVerification', {
          verifyAction: 'changePass',
          message: res.message,
          email: res.email,
        });
      }
    } catch (error: any) {
      console.log(error.message);
      helper.hideLoading();
      return false;
    }
  },
);

export const changePassVerifyOtpAction = createAsyncThunk(
  'auth/changePassVerifyOtpAction',
  async (body: IVerifyOtpBody) => {
    let path = 'api/user/changePasswordVerifyOtp';
    try {
      helper.showLoading();
      const res = await sendRequest(path, body);
      if (res.err != 200) {
        helper.showErrorMsg(res.message);
        return false;
      }
      helper.hideLoading();
      // helper.showSuccessMsg(
      //     res.message,
      //     () => goBack(3))
      navigate('success', {message: 'changePassSuccess'});
    } catch (error: any) {
      helper.hideLoading();
      return false;
    }
  },
);

export const sendDeviceInfo = createAsyncThunk<
  any,
  any,
  {state: RootState; dispatch: AppDispatch}
>(
  'auth/sendDeviceInfoAction',
  async (getStatus, {getState, rejectWithValue}) => {
    let firebaseToken = getState().authSlice.firebaseToken;
    if (!firebaseToken) {
      firebaseToken = await getFirebaseToken();
      setFirebaseToken(firebaseToken);
    }
    const body = {
      deviceToken: firebaseToken,
      deviceId: helper.getDeviceId(),
      deviceName: DeviceInfo.getBrand() + ' ' + DeviceInfo.getModel(),
      os: Platform.OS,
      osVersion: DeviceInfo.getSystemVersion(),
      appVersion: DeviceInfo.getVersion(),
    };
    let path = 'api/user/sendDeviceInfo';
    try {
      helper.showLoading();
      const res = await sendRequest(path, body);
      getStatus(res);
      if (res.err != 200) {
        rejectWithValue(res);
      }
      helper.hideLoading();
    } catch (error: any) {
      helper.hideLoading();
      rejectWithValue(error);
    }
  },
);

export interface IAuthState {
  token: string;
  loginSource: 'google' | 'facebook' | 'email';
  firebaseToken: string;
}

const initialState: IAuthState = {
  token: '',
  loginSource: 'email',
  firebaseToken: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetTokenWhenLogout: (state, action) => {
      state.token = '';
    },
    setFirebaseToken: (state, action) => {
      state.firebaseToken = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginWithGoogleAction.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.token = action.payload;
        state.loginSource = 'google';
      })
      .addCase(loginWithFacebookAction.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.token = action.payload;
        state.loginSource = 'facebook';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.token = action.payload;
      })
      .addCase(loginVerifyOtpAction.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.token = action.payload;
      })
      .addCase(registerVerifyOtpAction.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.token = action.payload;
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.token = '';
        state.loginSource = 'email';
      })
      .addCase(changePassVerifyOtpAction.fulfilled, (state, action) => {});
  },
});

export const {resetTokenWhenLogout, setFirebaseToken} = authSlice.actions;
export default authSlice.reducer;
