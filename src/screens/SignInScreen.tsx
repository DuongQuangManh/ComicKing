import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors} from '../constants';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils';
import {Button, Input} from '../components';
import {useNavigation} from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation<any>();
  const handlerSignIn = () => {};
  const handlerSignUp = () => {
    navigation.navigate('SignUpScreen');
  };
  const handlerForgot = () => {};
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
          containerStyle={{marginTop: 15}}
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
          containerStyle={{marginTop: 30}}
        />
      </View>
      <View style={styles.box}>
        <TouchableOpacity onPress={handlerSignUp} activeOpacity={0.6}>
          <Text>
            No account?
            <Text style={{color: Colors.RED_COLOR_CUSTOM}}> Sign up</Text>
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
