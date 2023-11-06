import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {Icon, Icons, Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
import React from 'react';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {push} from '@navigations';
import FastImage from 'react-native-fast-image';
import {IComic} from '@models';
import LinearGradient from 'react-native-linear-gradient';

type ItemProps = {
  name: string;
  readingChapter: number;
  image: string;
  onPress: () => void;
  numOfChapter: number;
};

const ITEM_WIDTH = WINDOW_WIDTH / 3;

const HistoryItem: React.FC<ItemProps> = ({
  name,
  readingChapter,
  image,
  onPress,
  numOfChapter,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FastImage style={styles.image} source={{uri: image}} />
      <LinearGradient
        style={styles.numChapterContainer}
        colors={[myColors.primary, '#b4135c']}
        start={{x: 0, y: 0}}>
        <Icon name="list" type={Icons.Entypo} size={11} color="#fff" />
        <Text style={{marginStart: 2}} color="#fff" type="medium_12">
          {numOfChapter}
        </Text>
      </LinearGradient>
      <LinearGradient
        style={styles.textReadingContainer}
        colors={['transparent', 'black']}>
        <Text
          type="regular_10"
          style={{
            color: 'white',
            flex: 1,
            textAlignVertical: 'center',
            paddingStart: 4,
          }}>
          Đọc tiếp chapter {readingChapter}
        </Text>
      </LinearGradient>
      <View style={{width: ITEM_WIDTH - 20}}>
        <Text
          type="regular_14"
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{width: '100%'}}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  docContainer: {
    paddingVertical: 12,
    flex: 1,
    paddingStart: 15,
    paddingEnd: 20,
    height: '100%',
  },
  image: {
    width: ITEM_WIDTH - 20,
    height: (ITEM_WIDTH - 20) * 1.4,
    borderRadius: 4,
  },
  numChapterContainer: {
    position: 'absolute',
    top: 18,
    left: 16,
    backgroundColor: myColors.primary,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  textReadingContainer: {
    position: 'absolute',
    left: 10,
    width: ITEM_WIDTH - 20,
    top: 128,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    height: 26,
  },
});
