import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {WINDOW_WIDTH, helper, myColors} from '../../utils';
import {Screen} from '../screen';
import {navigate, replace} from '@navigations';
import {Text} from '@components';
import SplashScreen from 'react-native-splash-screen';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {
  getDoneComics,
  getNewestComics,
  getProposeComics,
  getSliderComics,
} from '@redux/homeSlice';

import {
  getAuthorFollowing,
  getComicFollowing,
  getUserInfoAction,
} from '@redux/userSlice';
import {getLevel} from '@redux/levelSlice';

const Splash = () => {
  const dispatch = useAppDispatch();
  const {id = ''} = useAppSelector(state => state.userSlice.document);
  useEffect(() => {
    SplashScreen.hide();
    dispatch(getSliderComics());
    dispatch(getNewestComics());
    dispatch(getProposeComics());
    dispatch(getDoneComics());
    dispatch(getAuthorFollowing({userId: id}));
    dispatch(getComicFollowing({userId: id}));
    dispatch(getLevel({id: id}));
    setTimeout(() => {
      if (helper.getAccessToken() && id) {
        dispatch(getUserInfoAction({id}));
        replace('bottomNavigation');
      } else {
        replace('login');
      }
      clearTimeout(this);
    }, 300);
  }, []);
  return (
    <Screen
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      backgroundColor={myColors.primary}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('@assets/images/logo3.png')}
          style={styles.img}
        />
        <Text
          type="bold_28"
          style={{marginTop: 10, color: myColors.background}}>
          COMIC BOOK
        </Text>
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
