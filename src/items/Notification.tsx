import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
import {useAppDispatch} from '@redux/store';
import {getDetailNotification} from '@redux/notificationSlice';
import moment from 'moment';

interface itemProps {
  item?: any;
}
const Notification: FC<itemProps> = ({item}) => {
  const dispatch = useAppDispatch();
  const [isSee, setIsSee] = useState(item.isRead);
  const handlerSee = () => {
    dispatch(getDetailNotification({notificationId: item.id}));
    if (!isSee) {
      setIsSee(!isSee);
    }
  };
  return (
    <TouchableOpacity onPress={handlerSee}>
      <View
        style={[
          styles.container,
          {backgroundColor: isSee ? myColors.background : '#fd5c6920'},
        ]}>
        <FastImage
          source={
            item.tag == 'system'
              ? item.image
                ? {uri: item.image}
                : require('@assets/images/error_img.jpg')
              : require('@assets/icons/coin_v2_10000.png')
          }
          style={{width: 70, height: 70, borderRadius: 180}}
        />
        <View
          style={{
            flex: 1,
            paddingHorizontal: 8,
            justifyContent: 'space-between',
            paddingVertical: 4,
          }}>
          <Text type="bold_16" numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text
            color={myColors.textHint}
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{fontSize: 14}}>
            {item.content}
          </Text>
          <Text
            color={myColors.textHint}
            style={{fontSize: 12, alignSelf: 'flex-end'}}>
            {moment(item.createdAt).format('DD-MMMM-YYYY')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderBottomColor: myColors.gray,
    borderBottomWidth: 1,
    marginBottom: 3,
    minHeight: 80,
  },
});
