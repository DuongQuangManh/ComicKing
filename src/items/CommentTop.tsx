import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {WINDOW_WIDTH, myColors} from '@utils';
import {Text} from '@components';
interface itemProps {
  item?: any;
}
const CommentTop: FC<itemProps> = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <FastImage source={{uri: item.image}} style={styles.image} />
        <Text type="bold_18" style={{marginStart: 10}}>
          {item.name}
        </Text>
      </View>
      <Text type="semibold_16">{item.comment}</Text>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text>{item.time}</Text>
      </View>
    </View>
  );
};

export default CommentTop;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH - 30,
    height: 250,
    backgroundColor: myColors.gray,
    borderRadius: 18,
    padding: 10,
    marginStart: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 180,
  },
  box1: {
    flexDirection: 'row',
  },
});
