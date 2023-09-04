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
    birthday: '',
    isHidePass: true
  })

  const register = () => {
    dispatch(registerAction({
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPass,
      fullName: state.fullName,
      birthday: state.birthday
    }))
  }

  return (
    <Screen preset='scroll'>
      <Header text="Register" />
      <View style={{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        paddingTop: 25,
        paddingBottom: 10
      }}>
        <Input
          value={state.fullName}
          onChangeText={fullName => setState(pre => ({ ...pre, fullName }))}
          placeholder="Full name"
        />
        <Input
          isTrim
          value={state.email}
          onChangeText={email => setState(pre => ({ ...pre, email }))}
          placeholder="Email"
          style={{ marginTop: 15 }}
        />
        <DatePicker placeholder='Birth day'
          onChangeText={birthday => setState(pre => ({ ...pre, birthday: birthday ?? '' }))}
          value={state.birthday}
        />
        <Input
          isTrim
          value={state.password}
          onChangeText={password => setState(pre => ({ ...pre, password }))}
          placeholder="Password"
          secureTextEntry={state.isHidePass}
          style={{ marginTop: 15 }}
          isRightIcon
          onChangeShowPass={isHidePass => setState(pre => ({ ...pre, isHidePass }))}
        />
        <Input
          isTrim
          value={state.confirmPass}
          onChangeText={confirmPass => setState(pre => ({ ...pre, confirmPass }))}
          placeholder="Confirm password"
          secureTextEntry={state.isHidePass}
          style={{ marginTop: 15 }}
          isRightIcon
          onChangeShowPass={isHidePass => setState(pre => ({ ...pre, isHidePass }))}
        />
        <Button
          disable={
            !state.email
            || !state.password
            || !(state.password == state.confirmPass)
            || !state.birthday
            || !state.fullName
          }
          onPress={register}
          style={{ marginTop: 45 }}
          text='Next'
        />
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
