import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
interface itemProps {
  item?: any;
}
const PrivilegeItem: FC<itemProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <FastImage
        source={
          item.image
            ? {uri: item.image}
            : require('@assets/images/error_img.jpg')
        }
        style={{width: 50, height: 50, borderRadius: 180}}
      />
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        type="medium_14"
        style={{width: (WINDOW_WIDTH - 40) / 4}}>
        {item.title}
      </Text>
    </View>
  );
};

export default PrivilegeItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});
