import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { WINDOW_WIDTH, myColors } from '../../utils';
import { Screen } from '../screen';
import { navigate } from '@navigations';

const Splash = () => {
  useEffect(() => {
    setTimeout(() => {
      navigate('login');
    }, 2000);
  }, []);
  return (
    <Screen
      style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
      backgroundColor={myColors.primary}>
      <Image source={require('@assets/images/logo3.png')} style={styles.img} />
    </Screen>
  );
};

export default Splash;

const styles = StyleSheet.create({
  img: {
    width: WINDOW_WIDTH - 70,
    height: Math.round((WINDOW_WIDTH - 70) / 1.2),
  },
});