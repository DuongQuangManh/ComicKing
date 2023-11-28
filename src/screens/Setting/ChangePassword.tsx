import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Screen} from '../screen';
import {myColors} from '@utils';
import {Button, Header, Input, Text} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {navigate} from '@navigations';
import {changePassAction} from '@redux/authSlice';

const ChangePassword = () => {
  const document = useAppSelector(state => state.userSlice.document);
  const token = useAppSelector(state => state.authSlice.token);
  const dispatch = useAppDispatch();
  const [state, setState] = useState({
    oldPass: '',
    newPass: '',
    reNewPass: '',
  });
  const handlerChangePassword = () => {
    const body = {
      email: document.email,
      oldPass: state.oldPass,
      password: state.newPass,
      confirmPassword: state.reNewPass,
    };
    dispatch(changePassAction(body));
  };

  return (
    <Screen preset="scroll">
      <Header text="Change Password" />
      <View style={styles.box1}>
        <Text type="semibold_17">{document.fullName}</Text>
        <Text type="bold_30" style={{marginTop: 10}}>
          Change Password
        </Text>
        <Text type="medium_16" style={{marginTop: 8}}>
          Your password must have at least 6 characters
        </Text>
        <Input
          value={state.oldPass}
          isTrim
          placeholder="Current Password"
          onChangeText={oldPass => setState(pre => ({...pre, oldPass}))}
          containerStyle={{alignSelf: 'center', marginTop: 15}}
        />
        <Input
          value={state.newPass}
          isTrim
          placeholder="New Password"
          onChangeText={newPass => setState(pre => ({...pre, newPass}))}
          containerStyle={{alignSelf: 'center', marginTop: 15}}
        />
        <Input
          value={state.reNewPass}
          isTrim
          placeholder="Re-type new password"
          onChangeText={reNewPass => setState(pre => ({...pre, reNewPass}))}
          containerStyle={{alignSelf: 'center', marginTop: 15}}
        />
        <TouchableOpacity onPress={() => navigate('forgotPassword')}>
          <Text type="medium_16" style={{marginTop: 25}}>
            Forgot your password?
          </Text>
        </TouchableOpacity>
        <Button
          disable={
            !state.newPass ||
            !state.oldPass ||
            !state.reNewPass ||
            state.newPass !== state.reNewPass
          }
          text="Change Password"
          borderRadius={28}
          style={{alignSelf: 'center', marginTop: 100}}
          onPress={handlerChangePassword}
        />
      </View>
    </Screen>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    padding: 10,
  },
});
