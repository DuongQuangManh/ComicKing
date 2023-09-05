import { StyleSheet, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { WINDOW_WIDTH, helper, myColors } from '../../utils';
import { Screen } from '../screen';
import { navigate, replace } from '@navigations';
import { Text } from '@components';
import SplashScreen from 'react-native-splash-screen';

const Splash = () => {
  useEffect(() => {
    SplashScreen.hide()
    setTimeout(() => {
      if (helper.getAccessToken()) {
        replace('bottomHome')
      } else {
        replace('login');
      }
      clearTimeout(this)
    }, 300)
  }, []);
  return (
    <Screen
      style={{
        justifyContent: 'center',
        alignItems: 'center'
      }}
      backgroundColor={myColors.primary}>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('@assets/images/logo3.png')} style={styles.img} />
        <Text type='bold_28' style={{ marginTop: 10, color: myColors.background, }}>COMIC BOOK</Text>
      </View>
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