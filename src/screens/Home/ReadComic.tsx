import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Screen} from '../screen';
import {Header} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {getChapterDetail} from '@redux/chapterSlice';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigations';
import {FlashList} from '@shopify/flash-list';
import {PageChapter} from '@items';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {IChapterDetails} from '@models';
// api/user/detailChapter
const ReadComic = () => {
  const {id} = useRoute<RouteProp<StackParamList, 'readcomic'>>().params;
  const userId = useAppSelector(state => state.userSlice.document.id);
  const data = useAppSelector(state => state.chapterSlice.data);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getChapterDetail({userId: userId, chapterId: id}));
  }, []);
  return (
    <Screen>
      <Header
        backgroundColor={myColors.transparent}
        style={{position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10}}
      />
      <Text>Chapter 1</Text>
      <FlashList
        nestedScrollEnabled={true}
        estimatedItemSize={WINDOW_HEIGHT}
        estimatedListSize={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT}}
        data={data?.images}
        renderItem={({item}) => <PageChapter item={item} />}
      />
    </Screen>
  );
};

export default ReadComic;

const styles = StyleSheet.create({});
