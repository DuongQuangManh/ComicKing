import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {WINDOW_WIDTH, myColors} from '@utils';

import FastImage from 'react-native-fast-image';
import {Text} from '@components';
import {sendRequest} from '@api';
import {useAppSelector} from '@redux/store';
interface itemProps {
  item?: any;
}
const AttenDance: FC<itemProps> = ({item}) => {
  const [isCheckIn, setIsCheckIn] = useState(item.isAttened);
  const document = useAppSelector(state => state.userSlice.document);
  const handlerCheckIn = async () => {
    let path = 'api/user/dailyAttendance';
    if (item.canAttendance) {
      const res = await sendRequest(path, {userId: document.id});
      if (res.err === 200) {
        console.log('điểm danh thành công');
      }
    }
  };

  const colorText = () => {
    let color = myColors.text;
    if (isCheckIn || item.isExpired) {
      color = '#6a6969';
    } else if (item.canAttendance) {
      color = myColors.primary;
    }
    return color;
  };

  const labelText = () => {
    let label = item.label;
    if (isCheckIn) {
      label = 'Đã nhận';
    } else if (item.isExpired) {
      label = 'Hết hạn';
    }
    return label;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlerCheckIn}
      activeOpacity={isCheckIn || item.isExpired ? 1 : 0.7}>
      <View style={styles.container}>
        <View style={styles.box1}>
          <FastImage
            source={
              isCheckIn
                ? require('@assets/icons/coin_v2_600.png')
                : require('@assets/icons/coin_v2_8000.png')
            }
            style={{width: 50, height: 50, alignSelf: 'center'}}
            resizeMode="center"
          />
          <Text
            type="semibold_12"
            color={colorText()}
            style={{
              alignSelf: 'center',
              marginTop: 5,
            }}>{`${item.coinExtra} coin, ${item.expExtra} exp`}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text type="bold_14" color={colorText()}>
            {labelText()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AttenDance;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    width: 80,
    height: 95,
    borderRadius: 8,
    borderColor: myColors.gray,
    borderWidth: 1,
    padding: 5,
    marginStart: 5,
  },
});
