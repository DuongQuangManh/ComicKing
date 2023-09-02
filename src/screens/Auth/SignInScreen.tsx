import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '@constants';
import { WINDOW_HEIGHT, WINDOW_WIDTH, myColors } from '@utils';
import { Button, Input, Text } from '@components';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin'
import { loginAction, loginWithGoogleAction } from '@redux/authSlice'
import { useAppDispatch } from '@redux/store';
import auth from '@react-native-firebase/auth'

const SignInScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch()
  const handlerSignIn = () => { };
  const handlerSignUp = () => {
    navigation.navigate('SignUpScreen');
  };
  const handlerForgot = () => { };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.GOOGLE_AUTH_WEB_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true
    })
  }, [])

  const signinWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const data = await GoogleSignin.signIn()
      console.log("data", data)
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);
      console.log("user credential", userCredential)
      const user = userCredential.user;
      dispatch(loginWithGoogleAction({ idToken: await user.getIdToken() }))

    } catch (error: any) {
      console.log("Google Signin Error : ", error.message)
    }
  }

  return (
    <View style={styles.container}>
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
            width: WINDOW_WIDTH - 30,
            alignItems: 'flex-end',
            padding: 10,
          }}
          onPress={handlerForgot}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
        <Button
          onPress={handlerSignIn}
          text="Sign In"
          height={45}
          style={{ marginTop: 30 }}
        />
        <Text style={{ marginVertical: 10 }}>Or</Text>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signinWithGoogle}
        />
      </View>
      <View style={styles.box}>
        <TouchableOpacity onPress={handlerSignUp} activeOpacity={0.6}>
          <Text>
            No account?
            <Text color={myColors.primary} type='semibold_14'> Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
    alignItems: 'center',
  },
  box: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
