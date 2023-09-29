import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@utils';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useAppSelector} from '@redux/store';
interface itemProps {
  item?: any;
}
const PageChapter: FC<itemProps> = ({item}) => {
  const loading = useAppSelector(state => state.chapterSlice.loading);
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      visible={!loading}
      width={WINDOW_WIDTH}
      height={WINDOW_HEIGHT}>
      <FastImage
        source={item ? {uri: item} : require('@assets/images/error_img.jpg')}
        style={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT}}
      />
    </ShimmerPlaceholder>
  );
};

export default PageChapter;

const styles = StyleSheet.create({});
