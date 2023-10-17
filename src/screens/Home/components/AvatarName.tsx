import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {WINDOW_WIDTH, myColors} from '@utils';
import {Text} from '@components';
interface itemProps {
  item?: any;
}
const AvatarName: FC<itemProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <FastImage
        source={
          item.image ? {uri: item.image} : require('@assets/images/avatar.png')
        }
        style={{
          width: 80,
          height: 80,
          borderRadius: 180,
          borderColor: myColors.gray,
          borderWidth: 1,
        }}
      />
      <Text type="bold_20" style={{alignSelf: 'center', marginStart: 10}}>
        {item.name}
      </Text>
    </View>
  );
};
interface itemProps {
  item?: any;
}
export default AvatarName;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: WINDOW_WIDTH - 10,
    borderBottomColor: myColors.gray,
    padding: 10,
    borderBottomWidth: 1,
  },
});
