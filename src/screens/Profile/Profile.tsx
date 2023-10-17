import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Screen } from '../screen';
import { Header, Icon, Icons, Text } from '@components';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { helper, myColors } from '@utils';
import { goBack, navigate } from '@navigations';
import { getProfileAction } from '@redux/userSlice';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const Profile = () => {
  const dispatch = useAppDispatch();
  const {
    document: { id, fullName, image },
    avatarFrame, avatarTitle
  } = useAppSelector(state => state.userSlice);

  return (
    <Screen
      backgroundColor={myColors.gray}
      preset='scroll'
      statusBarColor={myColors.primary_60}
    >
      <TouchableOpacity style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
        onPress={() => navigate('setting')}>
        <Icon name={'settings-sharp'} color={myColors.text} type={Icons.Ionicons} size={20} />
      </TouchableOpacity>
      <LinearGradient colors={[myColors.primary_60, myColors.gray]} style={{ padding: 18 }}>
        <View style={{ height: 40 }}>

        </View>
        <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
          <View style={styles.imgContainer}>
            <FastImage
              source={image ? { uri: image } : require('@assets/images/avatar.png')}
              style={{ width: 72, height: 72, borderRadius: 35 }}
              resizeMode='contain'
            />
            <FastImage
              source={avatarFrame?.image ? { uri: avatarFrame.image } : require('@assets/avatar/img1.png')}
              style={{ position: 'absolute', width: 88, height: 88 }}
            />
          </View>
          <View style={{ paddingStart: 15, flex: 1 }}>
            <Text style={{ marginVertical: 8 }}>{fullName}</Text>
            <TouchableOpacity style={styles.lvlBtn}>
              <Text color='#fff' type='medium_14'>Lv1</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigate('infomation')
              dispatch(getProfileAction({ id }))
            }}
            style={styles.editBtn}
          >
            <Icon type={Icons.FontAwesome} name='edit' size={22} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <View style={styles.containerOption}>
        <TouchableOpacity style={styles.rowOption}>
          <Icon type={Icons.MaterialCommunityIcons} name='crown-outline' size={18} />
          <Text type='medium_14' style={{ flex: 1, paddingStart: 12 }}>Vip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowOption}>
          <Icon type={Icons.MaterialCommunityIcons} name='star-shooting-outline' size={18} />
          <Text type='medium_14' style={{ flex: 1, paddingStart: 12 }}>Nạp xu</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('editAvtFrame', { avatarFrame })} style={styles.rowOption}>
          <Icon type={Icons.MaterialCommunityIcons} name='image-frame' size={18} />
          <Text type='medium_14' style={{ flex: 1, paddingStart: 12 }}>Khung Avatar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('editAvtTitle', { avatarTitle })} style={styles.rowOption}>
          <Icon type={Icons.MaterialCommunityIcons} name='shield-star-outline' size={18} />
          <Text type='medium_14' style={{ flex: 1, paddingStart: 12 }}>Danh hiệu</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 500 }} />
    </Screen >
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  rowOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 16
  },
  containerOption: {
    marginHorizontal: 18,
    backgroundColor: myColors.background,
    borderRadius: 5,
    elevation: 1,
    padding: 12
  },
  imgContainer: {
    width: 90, height: 90,
    justifyContent: 'center',
    alignItems: 'center'
  },
  lvlBtn: {
    backgroundColor: myColors.primary,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'baseline',
    elevation: 2
  },
  editBtn: {
    width: 24, height: 24,
    position: 'absolute',
    top: 6, right: 8
  }
});
