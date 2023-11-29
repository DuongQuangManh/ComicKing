import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {myColors} from '@utils';

import FastImage from 'react-native-fast-image';
import {Text} from '@components';
import {sendRequest} from '@api';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {getUserWalletAction} from '@redux/userSlice';
import { useAppTheme } from '@hooks';
interface itemProps {
  item?: any;
}
const AttenDance: FC<itemProps> = ({item}) => {
  const [isCheckIn, setIsCheckIn] = useState(item.isAttened);
  const {coinExtraDaily = 0, expExtraDaily = 0} = item;
  const document = useAppSelector(state => state.userSlice.document);
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const handlerCheckIn = async () => {
    if (!isCheckIn) {
      setIsCheckIn(true);
      let path = 'api/user/dailyAttendance';
      if (item.canAttendance) {
        const res = await sendRequest(path, {userId: document.id});
        if (res.err === 200) {
          dispatch(getUserWalletAction({userId: document?.id}));
        } else {
          setIsCheckIn(false);
        }
      }
    }
  };

  // const colorText = () => {
  //   let color = myColors.text;
  //   if (isCheckIn || item.isExpired) {
  //     color = '#6a6969';
  //   } else if (item.canAttendance) {
  //     color = myColors.primary;
  //   }
  //   return color;
  // };

  const getBgColor = () => {
    let color = theme.gray;
    if (!isCheckIn && !item.isExpired && item.canAttendance) {
      color = myColors.primary;
    }
    return color;
  };

  const labelText = () => {
    let label = 'Nhận';
    if (isCheckIn || item.isAttened) {
      label = 'Đã nhận';
    } else if (item.isExpired) {
      label = 'Hết hạn';
    }
    return label;
  };

  return (
    <View style={[styles.container]}>
      {item.index == 0 ? (
        <>
          <View
            style={[
              styles.box1,
              {
                width: 330,
                flexDirection: 'row',
                padding: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: !item.isCurrentDay ? theme.itemCustom : theme.special,
                borderColor: theme.transparentGray
              },
            ]}>
            <Text type="regular_12">{item.label}</Text>
            <View>
              <FastImage
                source={
                  isCheckIn
                    ? require('@assets/icons/coin_v2_8000.png')
                    : require('@assets/icons/coin_v2_10000.png')
                }
                style={{width: 50, height: 50, alignSelf: 'center'}}
                resizeMode="center"
              />
              <Text
                type="semibold_12"
                style={{
                  alignSelf: 'center',
                  marginTop: 5,
                }}>{`${item.coinExtra} xu, ${item.expExtra} exp`}</Text>
              {(coinExtraDaily != 0 || expExtraDaily != 0) && (
                <Text
                  type="semibold_12"
                  style={{
                    alignSelf: 'center',
                    marginTop: 5,
                    color: myColors.primary,
                  }}>
                  + {`${coinExtraDaily} xu, ${expExtraDaily} exp`}
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={handlerCheckIn}
              disabled={!item.canAttendance || item.isExpired || isCheckIn}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 6,
                elevation: 1,
                borderRadius: 20,
                backgroundColor: getBgColor(),
              }}>
              <Text type="bold_14">{labelText()}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View
            style={[
              styles.box1,
              {
                backgroundColor: !item.isCurrentDay ? theme.itemCustom : theme.special,
                borderColor: theme.transparentGray
              },
            ]}>
            <Text type="regular_12">{item.label}</Text>
            <FastImage
              source={
                isCheckIn
                  ? require('@assets/icons/coin_v2_8000.png')
                  : require('@assets/icons/coin_v2_10000.png')
              }
              style={{width: 50, height: 50, alignSelf: 'center'}}
              resizeMode="center"
            />
            <Text
              type="semibold_12"
              style={{
                alignSelf: 'center',
                marginTop: 5,
              }}>{`${item.coinExtra} xu, ${item.expExtra} exp`}</Text>
            {(coinExtraDaily != 0 || expExtraDaily != 0) && (
              <Text
                type="semibold_12"
                style={{
                  alignSelf: 'center',
                  marginTop: 5,
                  color: myColors.primary,
                }}>
                + {`${coinExtraDaily} xu, ${expExtraDaily} exp`}
              </Text>
            )}
          </View>
          <TouchableOpacity
            disabled={!item.canAttendance || item.isExpired || isCheckIn}
            onPress={handlerCheckIn}
            style={{
              width: 70,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              height: 24,
              elevation: 1,
              borderRadius: 20,
              backgroundColor: getBgColor(),
              marginTop: 5,
            }}>
            <Text type="semibold_12">{labelText()}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default AttenDance;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  box1: {
    borderRadius: 8,
    borderColor: myColors.gray,
    borderWidth: 1,
    padding: 5,
    width: 110,
  },
});
