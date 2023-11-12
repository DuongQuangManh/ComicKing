import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {WINDOW_WIDTH, myColors} from '@utils';

import FastImage from 'react-native-fast-image';
import {Text} from '@components';
interface itemProps {
  item?: any;
}
const AttenDance: FC<itemProps> = ({item}) => {
  const [isCheckIn, setIsCheckIn] = useState(false);
  const handlerCheckIn = () => {
    if (!isCheckIn) {
      setIsCheckIn(!isCheckIn);
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlerCheckIn}>
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
            color={isCheckIn ? myColors.primary : myColors.text}
            style={{
              alignSelf: 'center',
              marginTop: 5,
            }}>{`${item.coinExtra} coin, ${item.expExtra} exp`}</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            type="bold_14"
            color={isCheckIn ? myColors.primary : myColors.text}>
            {isCheckIn ? 'Đã nhận' : item.label}
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
