import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {Button, Input, Text} from '@components';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  loginAction,
  loginWithFacebookAction,
  loginWithGoogleAction,
} from '@redux/authSlice';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {Screen} from '../screen';
import {StackParamList, navigate, reset} from '@navigations';
import {RouteProp, useRoute} from '@react-navigation/native';
import FbLoginBtn from './component/FbLoginBtn';
import GgLoginBtn from './component/GgLoginBtn';

const Login = () => {
  const dispatch = useAppDispatch();
  const params = useRoute<RouteProp<StackParamList, 'login'>>().params;
  const {token} = useAppSelector(state => state.authSlice);
  const [state, setState] = useState({
    email: params?.email ?? '',
    password: params?.password ?? '',
    isShowPass: true,
  });

  const navigateRegister = () => {
    navigate('register');
  };
  const navigateForgot = () => {
    navigate('forgotPassword');
  };
  const login = () => {
    dispatch(loginAction({email: state.email, password: state.password}));
  };

  const loginWithGoogle = async () => {
    dispatch(loginWithGoogleAction());
  };

  const loginWithFacebook = async () => {
    dispatch(loginWithFacebookAction());
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_AUTH_WEB_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  useEffect(() => {
    if (token) {
      reset([{name: 'bottomNavigation'}]);
    }
  }, [token]);

  return (
    <Screen style={{alignItems: 'center'}} preset="scroll">
      <Text
        color={myColors.primary}
        type="bold_30"
        style={{fontSize: 38, marginTop: 60}}>
        Welcome
      </Text>
      <Text type="regular_16">Sign in to start</Text>
      <Input
        style={{marginTop: 30}}
        value={state.email}
        isTrim
        onChangeText={email => setState(pre => ({...pre, email}))}
        placeholder="Email"
      />
      <Input
        value={state.password}
        isTrim
        onChangeText={password => setState(pre => ({...pre, password}))}
        placeholder="Password"
        secureTextEntry={state.isShowPass}
        style={{marginTop: 15}}
        isRightIcon
        onChangeShowPass={isShowPass => setState(pre => ({...pre, isShowPass}))}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          alignItems: 'flex-end',
          paddingVertical: 8,
          alignSelf: 'flex-end',
          paddingEnd: 25,
        }}
        onPress={navigateForgot}>
        <Text>Forgot password?</Text>
      </TouchableOpacity>
      <Button
        disable={!state.email || !state.password}
        onPress={login}
        text="Sign In"
        height={45}
        style={{marginTop: 30}}
      />
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 15}}>
        <View
          style={{flex: 1, height: 1, backgroundColor: myColors.textHint}}
        />
        <Text style={{marginTop: 15, marginHorizontal: 20, paddingBottom: 15}}>
          Or
        </Text>
        <View
          style={{flex: 1, height: 1, backgroundColor: myColors.textHint}}
        />
      </View>
      <GgLoginBtn onPress={loginWithGoogle} />
      <FbLoginBtn theme="dark" onPress={loginWithFacebook} />
      <TouchableOpacity
        style={{marginTop: 30}}
        onPress={navigateRegister}
        activeOpacity={0.6}>
        <Text>
          No have account?
          <Text color={myColors.primary} type="semibold_16">
            {' '}
            Sign up
          </Text>
        </Text>
      </TouchableOpacity>
    </Screen>
  );
};

export default Login;

const styles = StyleSheet.create({
  box: {
    width: WINDOW_WIDTH,
    height: Math.round(WINDOW_HEIGHT / 3),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
