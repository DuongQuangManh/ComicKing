import { Header } from '@components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Screen } from '../screen';
import NightItem from './components/NightItem';

const NighMode = () => {
 
  return (
    <Screen>
      <Header text='Night Mode' />
      <NightItem/>
    </Screen>
  );
};

export default NighMode;

const styles = StyleSheet.create({});
