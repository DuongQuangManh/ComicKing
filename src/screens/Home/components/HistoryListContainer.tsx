import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icons, Text, Icon} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
import {IReadingHistory} from '@models';
import FastImage from 'react-native-fast-image';
import {navigate, push} from '@navigations';
import LinearGradient from 'react-native-linear-gradient';

type ComponentProps = {
  listComic: IReadingHistory[];
  title: string;
};

const ITEM_WIDTH = 90;

const HistoryListContainer: React.FC<ComponentProps> = ({
  listComic = [],
  title,
}) => {
  return (
    <View style={styles.container}>
      <Text type="semibold_14" style={{paddingHorizontal: 4}}>
        {title}
      </Text>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{paddingVertical: 8}}>
        {listComic.length >= 1 &&
          listComic.slice(0, 8).map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.8}
                style={styles.btn}
                onPress={() => {
                  if (item.readingChapter) {
                    navigate('readcomic', {
                      id: item.id,
                      chapter: item.readingChapter,
                      needLoadComic: true,
                      name: item.name,
                      image: item.image,
                      numOfChapter: item.numOfChapter,
                    });
                  } else {
                    push('comicdetail', {id: item.id});
                  }
                }}>
                <FastImage style={styles.image} source={{uri: item.image}} />
                <LinearGradient
                  style={styles.numChapterContainer}
                  colors={[myColors.primary, '#b4135c']}
                  start={{x: 0, y: 0}}>
                  <Icon name="list" type={Icons.Entypo} size={9} color="#fff" />
                  <Text style={{marginStart: 2}} color="#fff" type="regular_10">
                    {item.numOfChapter}
                  </Text>
                </LinearGradient>
                <LinearGradient
                  style={styles.textReadingContainer}
                  colors={['transparent', 'black']}>
                  <Text type="regular_10" style={styles.textReading}>
                    Đọc tiếp chapter {item.readingChapter}
                  </Text>
                </LinearGradient>
                <View style={{width: ITEM_WIDTH}}>
                  <Text
                    type="regular_12"
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    style={{width: '100%'}}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default HistoryListContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  textReadingContainer: {
    position: 'absolute',
    top: 100,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    height: 26,
    width: ITEM_WIDTH,
  },
  textReading: {
    color: 'white',
    flex: 1,
    textAlignVertical: 'center',
    paddingStart: 4,
  },
  numChapterContainer: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: myColors.primary,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.4,
    borderRadius: 3,
  },
  btn: {
    alignItems: 'center',
    width: ITEM_WIDTH,
    marginStart: 8,
  },
});
