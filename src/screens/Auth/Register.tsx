import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Button, DatePicker, Footer, Header, Input } from '@components';
import { myColors } from '@utils';
import { Screen } from '../screen';
import { useAppDispatch } from '@redux/store';
import { registerAction } from '@redux/authSlice';

const Register = () => {
  const dispatch = useAppDispatch()
  const [state, setState] = useState({
    email: '',
    password: '',
    confirmPass: '',
    fullName: '',
    birthDay: '',
    isShowPass: true
  })

  const register = () => {
    dispatch(registerAction({
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPass,
      fullName: state.fullName,
      birthday: state.birthDay
    }))
  }

  return (
    <Screen preset='scroll'>
      <Header text="Register" />
      <View style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        paddingTop: 25
      }}>
        <Input
          onChangeText={email => setState(pre => ({ ...pre, email }))}
          placeholder="Full name"
        />
        <Input
          onChangeText={email => setState(pre => ({ ...pre, email }))}
          placeholder="Email"
          style={{ marginTop: 15 }}
        />
        <DatePicker label='Datepicker'
          onChangeText={(e) => console.log(e)}

        />
        <Input
          onChangeText={password => setState(pre => ({ ...pre, password }))}
          placeholder="Password"
          secureTextEntry={state.isShowPass}
          style={{ marginTop: 15 }}
          isRightIcon
          onChangeShowPass={isShowPass => setState(pre => ({ ...pre, isShowPass }))}
        />
        <Input
          onChangeText={confirmPassword => setState(pre => ({ ...pre, confirmPassword }))}
          placeholder="Confirm password"
          secureTextEntry={state.isShowPass}
          style={{ marginTop: 15 }}
          isRightIcon
          onChangeShowPass={isShowPass => setState(pre => ({ ...pre, isShowPass }))}
        />
        {/* <Footer> */}
        <Button onPress={register} style={{ marginTop: 45 }} text='Register' />
        {/* </Footer> */}
      </View>
    </Screen>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.background,
  },
});
