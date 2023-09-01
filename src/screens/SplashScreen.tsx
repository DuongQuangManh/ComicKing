import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import Button from '../components/Button';
import {Input} from '../components';
import {Colors} from '../constants';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '../utils';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignInScreen');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.img} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.RED_COLOR_CUSTOM,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: WINDOW_WIDTH - 70,
    height: (WINDOW_HEIGHT * 1) / 3.7,
  },
});
