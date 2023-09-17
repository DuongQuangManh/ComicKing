import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import Modal from 'react-native-modal';
import {helper, myColors} from '@utils';

import {goBack, navigate, reset} from '@navigations';
import {Icon, Icons, Text} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {logoutAction} from '@redux/authSlice';
import MenuItem from './components/MenuItem';
import {usePreviousRouteName} from '@hooks';

const Menu = () => {
  const dispatch = useAppDispatch();
  const previousRouteName = usePreviousRouteName();

  const document = useAppSelector(state => state.userSlice.document);
  const token = useAppSelector(state => state.authSlice.token);

  console.log('Document Menu.tsx', document);

  useEffect(() => {
    if (!token) reset([{name: 'login'}]);
  }, [token]);
  const handlerShowProfile = () => {
    goBack();
    navigate('profile');
  };
  return (
    <Modal
      isVisible
      animationIn={'slideInDown'}
      backdropOpacity={0.4}
      onBackdropPress={goBack}
      style={{
        flex: 1,
        borderRadius: 18,
        marginTop: 20,
      }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlerShowProfile} activeOpacity={0.7}>
          <View style={styles.box1}>
            <View style={styles.avt}>
              <Image
                source={
                  document.image
                    ? {uri: document.image}
                    : require('@assets/images/avatar.png')
                }
                style={styles.img}
              />
            </View>
            <View style={styles.name}>
              <Text type="semibold_17">{document.fullName}</Text>
              <Text>{document.email ?? document.nickName}</Text>
            </View>
            <Icon type={Icons.Entypo} name="chevron-down" />
          </View>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{paddingTop: 15}}>
          <MenuItem
            name="Home"
            iconName="search"
            onPress={() => {
              goBack();
              navigate('home');
            }}
            isSelect={previousRouteName == 'home'}
          />
          <MenuItem
            name="Search"
            iconName="search"
            onPress={() => {
              goBack();
              navigate('search');
            }}
            isSelect={false}
          />
          <MenuItem
            name="Favorite"
            iconName="heart-outline"
            onPress={() => {
              goBack();
              navigate('favorite');
            }}
            isSelect={false}
          />
          <MenuItem
            name="Notification"
            iconName="bell-o"
            iconType={Icons.FontAwesome}
            onPress={() => {
              goBack();
              navigate('notification');
            }}
            isSelect={previousRouteName == 'notification'}
          />
          <MenuItem
            name="Setting"
            iconName="settings-outline"
            iconType={Icons.Ionicons}
            onPress={() => {
              goBack();
              navigate('setting');
            }}
            isSelect={previousRouteName == 'setting'}
          />
          <MenuItem
            name="Logout"
            iconName="sign-out"
            iconType={Icons.Octicons}
            onPress={() => {
              helper.showConfirmMsg('Do you want logout?', () => {
                dispatch(logoutAction());
              });
            }}
          />
        </ScrollView>
      </View>
    </Modal>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.transparentWhite,
    padding: 20,
    borderRadius: 18,
    marginTop: 50,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 180,
  },
  box1: {
    backgroundColor: myColors.background,
    padding: 10,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  avt: {
    width: 54,
    height: 54,
    borderRadius: 180,
    borderWidth: 2,
    borderColor: myColors.background,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  name: {
    justifyContent: 'space-around',
  },
});
