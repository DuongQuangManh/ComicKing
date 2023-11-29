import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect} from 'react';
import {WINDOW_WIDTH, helper, myColors} from '../../utils';
import {Screen} from '../screen';
import {replace} from '@navigations';
import {Text} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {sendDeviceInfo} from '@redux/authSlice';

const Splash = () => {
  const dispatch = useAppDispatch();
  const {id = ''} = useAppSelector(state => state.userSlice.document);

  const getDeviceInfo = async () => {
    dispatch(sendDeviceInfo(getStatus));
  };

  const getStatus = (res: any) => {
    if (res?.err == 200) {
      if (helper.getAccessToken() && id) {
        helper.getAsset(dispatch, id);
        replace('bottomNavigation');
      } else {
        replace('login');
      }
    } else {
      helper.showErrorMsg(res?.message);
    }
  };

  useEffect(() => {
    getDeviceInfo();
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
