import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {WINDOW_WIDTH, helper, myColors} from '../../utils';
import {Screen} from '../screen';
import {replace} from '@navigations';
import {Text} from '@components';
import SplashScreen from 'react-native-splash-screen';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {
  getDoneComics,
  getHotComic,
  getNewestComicUpdatedChapter,
  getNewestComics,
  getProposeComics,
  getSliderComics,
} from '@redux/homeSlice';

import {
  getHistoryReading,
  getUserInfoAction,
  getUserWalletAction,
} from '@redux/userSlice';
import {getAttendance} from '@redux/attendanceSlice';

const Splash = () => {
  const dispatch = useAppDispatch();
  const {id = ''} = useAppSelector(state => state.userSlice.document);
  useEffect(() => {
    SplashScreen.hide();

    setTimeout(() => {
      if (helper.getAccessToken() && id) {
        helper.getAsset(dispatch, id);
        replace('bottomNavigation');
      } else {
        replace('login');
      }
      clearTimeout(this);
    }, 1000);
  }, []);
  return (
    <Screen statusBarColor={myColors.primary}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: myColors.primary,
        }}>
        <Image
          source={require('@assets/images/logo3.png')}
          style={styles.img}
        />
        <Text
          type="bold_28"
          style={{marginTop: 10, color: myColors.background}}>
          Comic Stuff
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
