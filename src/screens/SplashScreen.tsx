import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { WINDOW_WIDTH, myColors } from '../utils';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SignInScreen');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image source={require('@assets/images/logo3.png')} style={styles.img} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: WINDOW_WIDTH - 70,
    height: Math.round((WINDOW_WIDTH - 70) / 1.2),
  },
});
