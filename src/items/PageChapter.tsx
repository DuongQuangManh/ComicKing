import { StyleSheet, View } from 'react-native';
import React, { FC } from 'react';
import FastImage from 'react-native-fast-image';
import { WINDOW_WIDTH, } from '@utils';
import { Text } from '@components';
interface itemProps {
  item?: any;
  firstItem?: any;
}
const PageChapter: FC<itemProps> = ({ item, firstItem }) => {
  return (
    <>
      {!isNaN(item) ? (
        <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
          <Text type="bold_18">
            {firstItem != 0 && `Chapter ${item}`}
          </Text>
        </View>
      ) : (
        <FastImage
          source={item ? { uri: item } : require('@assets/images/error_img.jpg')}
          style={{
            width: WINDOW_WIDTH,
            height: WINDOW_WIDTH * 1.5,
          }}
          resizeMode="contain"
        />
      )}
    </>
  );
};

export default PageChapter;

const styles = StyleSheet.create({});
