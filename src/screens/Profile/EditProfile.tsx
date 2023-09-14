import {StyleSheet, View, Image} from 'react-native';
import React, {useState, useMemo} from 'react';
import {Screen} from '../screen';
import {DatePicker, Header, Icons, Input, Text} from '@components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigations';
import {WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors} from '@utils';
import RadioGroup from 'react-native-radio-buttons-group';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {updateProfileAction} from '@redux/userSlice';

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const {fullName, id, image, nickName, birthday, gender} = useAppSelector(
    state => state.userSlice.document,
  );
  const {value, message, typeAction, label} =
    useRoute<RouteProp<StackParamList, 'editprofile'>>().params;
  const [txt, setTxt] = useState(value);
  const [selectedId, setSelectedId] = useState(helper.getGenderId(txt));
  const genderButton = useMemo(
    () => [
      {
        id: '1',
        label: 'Male',
        value: 'male',
      },
      {
        id: '2',
        label: 'Female',
        value: 'female',
      },
      {
        id: '3',
        label: 'None',
        value: 'none',
      },
    ],
    [],
  );

  const handlerSave = () => {
    switch (typeAction) {
      case 'image':
        const body0 = {
          id: id,
          image: value.data,
          nickName: nickName,
          fullName: fullName,
          birthday: birthday,
          gender: gender,
        };
        return dispatch(updateProfileAction(body0));
      case 'fullname':
        const body1 = {
          id: id,
          image: image,
          nickName: nickName,
          fullName: txt,
          birthday: birthday,
          gender: gender,
        };
        return dispatch(updateProfileAction(body1));
      case 'nickname':
        const body2 = {
          id: id,
          image: image,
          nickName: txt,
          fullName: fullName,
          birthday: birthday,
          gender: gender,
        };
        return dispatch(updateProfileAction(body2));
      case 'birthday':
        const body3 = {
          id: id,
          image: image,
          nickName: nickName,
          fullName: fullName,
          birthday: txt,
          gender: gender,
        };
        return dispatch(updateProfileAction(body3));
      case 'gender':
        const body4 = {
          id: id,
          image: image,
          nickName: nickName,
          fullName: fullName,
          birthday: birthday,
          gender: helper.getGender(selectedId),
        };
        return dispatch(updateProfileAction(body4));
    }
  };

  return (
    <Screen backgroundColor={myColors.background}>
      <Header
        text={label}
        isIconEnd={true}
        nameIconEnd="save"
        onClickIconEnd={handlerSave}
        typeIconEnd={Icons.Entypo}
      />
      <View style={styles.box1}>
        <Text type="bold_22">{label}</Text>
        {typeAction === 'birthday' && (
          <View style={{height: 60, width: WINDOW_WIDTH}}>
            <DatePicker
              placeholder={label}
              onChangeText={d => setTxt(d || '')}
              value={txt}
            />
          </View>
        )}
        {typeAction === 'gender' && (
          <RadioGroup
            radioButtons={genderButton}
            onPress={setSelectedId}
            selectedId={selectedId}
            containerStyle={{alignItems: 'flex-start', marginTop: 10}}
            layout="row"
          />
        )}
        {typeAction === 'fullname' && (
          <Input
            value={txt}
            onChangeText={text => setTxt(text)}
            width={WINDOW_WIDTH - 10}
            style={{alignSelf: 'center'}}
          />
        )}
        {typeAction === 'nickname' && (
          <Input
            value={txt}
            onChangeText={text => setTxt(text)}
            width={WINDOW_WIDTH - 10}
            style={{alignSelf: 'center'}}
          />
        )}
        {typeAction === 'image' && (
          <Image
            source={{uri: value.path}}
            style={{width: WINDOW_WIDTH - 20, height: WINDOW_HEIGHT - 30}}
          />
        )}
        <Text style={styles.message}>{message}</Text>
      </View>
    </Screen>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  box1: {
    flex: 1,
    padding: 5,
  },
  message: {
    marginTop: 20,
  },
});
