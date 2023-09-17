import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {myColors} from '@utils';
import {Header} from '@components';

const Favorite = () => {
  return (
    <Screen backgroundColor={myColors.background}>
      <Header text="Favorite" />
    </Screen>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
