import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../screen';
import {Header, Text} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import InfoItem from './Components/InfoItem';
import {helper, myColors} from '@utils';
import {goBack, navigate} from '@navigations';
import {getProfileAction} from '@redux/userSlice';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';

const Profile = () => {
  const document = useAppSelector(state => state.userSlice.document);
  const loading = useAppSelector(state => state.userSlice.loading);
  const [img, setImg] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getProfileAction({id: document.id}));
  }, []);

  const imagePicker = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      console.log(image);
      navigate('editprofile', {
        value: image,
        message: 'hello',
        typeAction: 'image',
        label: 'Avatar',
      });
    });
    // console.log(result.assets[0].uri);
    // console.log(helper.convertImageToBase64(result.assets[0].uri));
  };
  return (
    <Screen backgroundColor={myColors.background}>
      <Header text={document.fullName} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.boxsd}
          onPress={() => helper.checkPermission(imagePicker)}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            visible={!loading}
            width={157}
            height={157}
            style={{borderRadius: 180, alignSelf: 'center'}}>
            <Image source={{uri: document.image}} style={styles.img} />
          </ShimmerPlaceholder>
        </TouchableOpacity>
        <View style={styles.box1}>
          <Text type="semibold_16">Introduce yourself</Text>
          <InfoItem
            label="FullName"
            text={document.fullName}
            onPress={() =>
              navigate('editprofile', {
                value: document.fullName,
                message: 'hello',
                typeAction: 'fullname',
                label: 'FullName',
              })
            }
          />
          <InfoItem
            label="NickName"
            text={document.nickName}
            onPress={() =>
              navigate('editprofile', {
                value: document.nickName,
                message: 'hello',
                typeAction: 'nickname',
                label: 'NickName',
              })
            }
          />
          <InfoItem
            label="Gender"
            text={document.gender}
            onPress={() =>
              navigate('editprofile', {
                value: document.gender || '',
                message: 'hello',
                typeAction: 'gender',
                label: 'Gender',
              })
            }
          />
          <InfoItem
            label="Birthday"
            text={document.birthday}
            onPress={() =>
              navigate('editprofile', {
                value: document.birthday || '',
                message: 'hello',
                typeAction: 'birthday',
                label: 'Birthday',
              })
            }
          />
        </View>
      </View>
    </Screen>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 180,
    borderWidth: 3,
    borderColor: myColors.background,
  },
  boxsd: {
    width: 157,
    height: 157,
    borderRadius: 180,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  box1: {
    flex: 1,
    paddingTop: 25,
  },
});
