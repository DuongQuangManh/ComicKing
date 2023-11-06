import { StyleSheet } from 'react-native';
import React from 'react';
import { Screen } from '../screen';
import { helper, myColors } from '@utils';
import { Header, Icons } from '@components';
import MenuItem from '../Home/components/MenuItem';
import { navigate, reset } from '@navigations';
import { logoutAction } from '@redux/authSlice';
import { useAppDispatch } from '@redux/store';

const Setting = () => {
  const dispatch = useAppDispatch()

  return (
    <Screen backgroundColor={myColors.background}>
      <Header text="Setting" />
      <MenuItem
        name="Change Password"
        iconName="shield-outline"
        onPress={() => {
          navigate('changePassword');
        }}
        iconType={Icons.Ionicons}
      />
      <MenuItem
        name="Language"
        iconName="language"
        onPress={() => {
          navigate('changePassword');
        }}
        iconType={Icons.MaterialIcons}
      />
      <MenuItem
        name="Nigh mode"
        iconName="light-down"
        onPress={() => {
          navigate('success');
        }}
        iconType={Icons.Entypo}
      />
      <MenuItem
        name='Logout'
        iconName='logout'
        onPress={() => {
          helper.showConfirmMsg('Do you want logout?', () => {
            dispatch(logoutAction());
          });
        }}
        iconType={Icons.AntDesign}
      />
    </Screen>
  );
};

export default Setting;

const styles = StyleSheet.create({});
