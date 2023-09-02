import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Header } from '@components';
import { myColors } from '@utils';
import { Screen } from '../screen';
import { goBack } from '@navigations';

const Register = () => {
  const handlerBack = () => {
    goBack()
  };
  return (
    <Screen>
      <Header text="Sign Up" onBack={handlerBack} />
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
