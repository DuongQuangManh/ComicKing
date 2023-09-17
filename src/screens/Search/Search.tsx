import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {myColors} from '@utils';
import {Header} from '@components';

const Search = () => {
  return (
    <Screen backgroundColor={myColors.background}>
      <Header text="Search" />
    </Screen>
  );
};

export default Search;

const styles = StyleSheet.create({});
