import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors } from '@utils';
import { Button, Input, Text } from '@components';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { loginAction, loginWithGoogleAction } from '@redux/authSlice'
import { useAppDispatch } from '@redux/store';
import auth from '@react-native-firebase/auth'
import { Screen } from '../screen';
import { goBack, navigate } from '@navigations'

const Login = () => {
  const dispatch = useAppDispatch()

  const onLogin = () => {

  };

  const navigateRegister = () => {
    navigate('register')
  };
  const navigateForgot = () => {
    navigate('forgotPassword')
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_AUTH_WEB_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true
    })
  }, [])

  const loginWithGoogle = async () => {
    dispatch(loginWithGoogleAction())
  }

  return (
    <Screen preset='scroll'>
      <View style={styles.box}>
        <Text
          color={myColors.primary}
          type='bold_30'
          style={{ fontSize: 38 }}>Welcome</Text>
        <Text type='regular_16'>Sign in to start</Text>
      </View>
      <View style={styles.box}>
        <Input placeholder="Email" />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          style={{ marginTop: 15 }}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={{
            alignItems: 'flex-end',
            paddingVertical: 8,
            alignSelf: 'flex-end',
            paddingEnd: 25
          }}
          onPress={navigateForgot}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
        <Button
          onPress={onLogin}
          text="Sign In"
          height={45}
          style={{ marginTop: 30 }}
        />
        <Text style={{ marginVertical: 10 }}>Or</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={loginWithGoogle}
        />
      </View>
      <View style={styles.box}>
        <TouchableOpacity
          style={{ paddingVertical: 5 }}
          onPress={navigateRegister}
          activeOpacity={0.6}>
          <Text>
            No account?
            <Text color={myColors.primary} type='semibold_16'> Sign up</Text>
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
