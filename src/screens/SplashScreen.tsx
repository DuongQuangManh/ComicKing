import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import {Input} from '../components';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text>SplashScreen</Text>
      <Button text="Bấm đi" />
      <Input extraProps={{}} placeholder="Email" />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
