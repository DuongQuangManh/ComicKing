import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';

interface itemProps {
  item?: any;
}
const Notification: FC<itemProps> = ({item}) => {
  const [isSee, setIsSee] = useState(item.isSee);
  const handlerSee = () => {
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
            item.image
              ? {uri: item.image}
              : require('@assets/images/error_img.jpg')
          }
          style={{width: 70, height: 70, borderRadius: 180}}
        />
        <Text style={{flex: 1, marginStart: 10, alignSelf: 'center'}}>
          <Text type="bold_16" numberOfLines={3} ellipsizeMode="tail">
            {item.fullname}
          </Text>{' '}
          {item.content}
        </Text>
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
