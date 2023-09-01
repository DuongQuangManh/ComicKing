import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Colors } from '@constants';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@utils';
import { Button, Input } from '@components';
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
      
      const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
      const userCredential = await auth().signInWithCredential(googleCredential);

      const user = userCredential.user;
      dispatch(loginWithGoogleAction({idToken: await user.getIdToken()}))
      
    } catch (error: any) {
      console.log("Google Signin Error : ", error.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text
          style={{
            fontSize: 38,
            color: Colors.RED_COLOR_CUSTOM,
            fontWeight: '700',
          }}>
          Welcome
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: Colors.BLACK_COLOR,
            fontWeight: '400',
            marginTop: 10,
          }}>
          Sign in to start
        </Text>
      </View>
      <View style={styles.box}>
        <Input placeholder="Email" extraProps={{}} />
        <Input
          placeholder="Password"
          extraProps={{
            secureTextEntry: true,
          }}
          containerStyle={{ marginTop: 15 }}
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
          onClick={handlerSignIn}
          text="Sign In"
          width={WINDOW_WIDTH - 100}
          height={45}
          containerStyle={{ marginTop: 30 }}
        />
        <Text>Or</Text>
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
            <Text style={{ color: Colors.RED_COLOR_CUSTOM }}> Sign up</Text>
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
