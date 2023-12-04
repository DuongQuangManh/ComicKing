import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';

interface itemProps {
  item?: any;
}
const Notification: FC<itemProps> = ({item}) => {
  console.log(item);
  const [isSee, setIsSee] = useState(item.isRead);
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
