import {StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useAppSelector} from '@redux/store';
import {Text} from '@components';
interface itemProps {
  item?: any;
  firstItem?: any;
}
const PageChapter: FC<itemProps> = ({item, firstItem}) => {
  const loading = useAppSelector(state => state.chapterSlice.loading);
  const [width, height] = useState({});
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      visible={!loading}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT}>
      {!isNaN(item) ? (
        <Text type="bold_18" style={{alignSelf: 'center'}}>
          {firstItem != 0 && `Chapter ${item}`}
        </Text>
      ) : (
        <FastImage
          source={item ? {uri: item} : require('@assets/images/error_img.jpg')}
          style={{
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT,
          }}
          // onLoad={event => {
          //   const { width, height } = event.nativeEvent;
          //   setImageSize({ width, height });
          // }}
          resizeMode="contain"
        />
      )}
    </ShimmerPlaceholder>
  );
};

export default PageChapter;

const styles = StyleSheet.create({});
