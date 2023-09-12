import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {myColors} from '@utils';
import {Header, Icons} from '@components';
import MenuItem from '../Home/components/MenuItem';
import {navigate} from '@navigations';

const Setting = () => {
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
          navigate('changePassword');
        }}
        iconType={Icons.Entypo}
      />
    </Screen>
  );
};

export default Setting;

const styles = StyleSheet.create({});
