import {
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Utilitys, WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors} from '@utils';

import {ItemUtility} from '@items';
import {goBack} from '@navigations';
import {Icon, Icons, Text} from '@components';
import {useAppDispatch} from '@redux/store';
import {logoutAction} from '@redux/authSlice';

const Utility = () => {
  const dispatch = useAppDispatch();
  const logout = {
    id: 4,
    name: 'Sign out',
    nameIcon: 'sign-out',
    typeIcon: Icons.Octicons,
    onClick: () => {
      helper.showConfirmMsg('Do you want logout?', () => {
        dispatch(logoutAction());
      });
    },
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
        <TouchableOpacity>
          <View style={styles.box1}>
            <View style={styles.avt}>
              <Image
                source={require('@assets/images/avatar.png')}
                style={styles.img}
              />
            </View>
            <View style={styles.name}>
              <Text type="semibold_17">Dương Quang Mạnh</Text>
              <Text>manhvodich@gmail.com</Text>
            </View>
            <Icon type={Icons.Entypo} name="chevron-down" />
          </View>
        </TouchableOpacity>
        <FlatList
          style={{marginTop: 30}}
          data={Utilitys}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <ItemUtility item={item} />}
          ListFooterComponent={() => <ItemUtility item={logout} />}
        />
      </View>
    </Modal>
  );
};

export default Utility;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.transparentWhite,
    padding: 25,
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
