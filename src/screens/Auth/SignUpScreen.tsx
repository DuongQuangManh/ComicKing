import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Header} from '../../components';
import {Colors} from '../../constants';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = () => {
  const navigation = useNavigation<any>();
  const handlerBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header text="Sign Up" onBack={handlerBack} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE_COLOR,
  },
});
