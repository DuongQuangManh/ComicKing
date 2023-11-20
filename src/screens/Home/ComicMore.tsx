import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {Header} from '@components';
import {FlashList} from '@shopify/flash-list';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigations';
import {useAppSelector} from '@redux/store';
import {IComic} from '@models';
import {ComicSmall} from '@items';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@utils';

const ComicMore = () => {
  const {type} = useRoute<RouteProp<StackParamList, 'comicMore'>>().params;
  const {newestComic, hotComic, doneComics} = useAppSelector(
    state => state.homeSlice,
  );

  const title = () => {
    let txt = '';
    if (type === 'done') {
      txt = 'Truyện đã hoàn thành';
    } else if (type === 'hot') {
      txt = 'Truyện hot';
    } else if (type === 'new') {
      txt = 'Truyện mới';
    }
    return txt;
  };
  const data = () => {
    let comics = [] as IComic[];
    if (type === 'done') {
      comics = doneComics;
    } else if (type === 'hot') {
      comics = hotComic;
    } else if (type === 'new') {
      comics = newestComic;
    }
    return comics;
  };

  return (
    <Screen>
      <Header text={title()} />
      <FlashList
        data={data()}
        renderItem={({item}) => <ComicSmall item={item} />}
        estimatedItemSize={WINDOW_WIDTH}
        estimatedListSize={{
          width: WINDOW_WIDTH,
          height: WINDOW_HEIGHT,
        }}
        numColumns={3}
      />
    </Screen>
  );
};

export default ComicMore;

const styles = StyleSheet.create({});
