import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors} from '@utils';
import {Button, Input, Text} from '@components';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {loginAction, loginWithGoogleAction} from '@redux/authSlice';
import {useAppDispatch} from '@redux/store';
import {Screen} from '../screen';
import {StackParamList, navigate} from '@navigations';
import {RouteProp, useRoute} from '@react-navigation/native';

const Login = () => {
  const dispatch = useAppDispatch();
  const params = useRoute<RouteProp<StackParamList, 'login'>>().params;
  const [state, setState] = useState({
    email: params?.email ?? '',
    password: params?.password ?? '',
    isShowPass: true,
  });

  const navigateRegister = () => {
    navigate('register');
    // navigate('otpVerification', { verifyAction: 'login', message: 'Vui lòng xác minh mã Otp từ email Le gia tuan dep trai để hoàn thành đăng nhập.', email: 'legiatuan03@gmail.com' })
  };
  const navigateForgot = () => {
    navigate('forgotPassword');
  };
  const login = () => {
    dispatch(loginAction({email: state.email, password: state.password}));
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_AUTH_WEB_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const loginWithGoogle = async () => {
    dispatch(loginWithGoogleAction());
  };

  return (
    <Screen preset="scroll">
      <View style={styles.box}>
        <Text color={myColors.primary} type="bold_30" style={{fontSize: 38}}>
          Welcome
        </Text>
        <Text type="regular_16">Sign in to start</Text>
      </View>
      <View style={styles.box}>
        <Input
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
          onChangeShowPass={isShowPass =>
            setState(pre => ({...pre, isShowPass}))
          }
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
        <Text style={{marginVertical: 10}}>Or</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={loginWithGoogle}
        />
      </View>
      <View style={styles.box}>
        <TouchableOpacity
          style={{paddingVertical: 5}}
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
      </View>
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
