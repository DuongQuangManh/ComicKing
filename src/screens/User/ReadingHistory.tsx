import {StyleSheet, ActivityIndicator} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Screen} from '../screen';
import {Header} from '@components';
import {IReadingHistory} from '@models';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {FlashList} from '@shopify/flash-list';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {sendRequest} from '@api';
import {navigate, push} from '@navigations';
import HistoryItem from './components/HistoryItem';
import {setReadingHistory} from '@redux/homeSlice';

type StateType = {
  listHistory: IReadingHistory[];
  isLoading: boolean;
};

const ReadingHistory = () => {
  const dispatch = useAppDispatch();
  const {id} = useAppSelector(state => state.userSlice.document ?? {});
  const [state, setState] = useState<StateType>({
    listHistory: [],
    isLoading: true,
  });
  const {listHistory, isLoading} = state;
  const dataReq = useRef({
    skip: 0,
    limit: 20,
  }).current;

  const getListHistory = async () => {
    setState(pre => ({...pre, isLoading: true}));
    try {
      const res = await sendRequest('api/user/getHistoryReading', {
        userId: id,
        ...dataReq,
      });
      if (res.err == 200) {
        dispatch(setReadingHistory(res.data));
        setState(pre => ({
          ...pre,
          listHistory: res.data ?? [],
          isLoading: false,
        }));
      } else {
        helper.showErrorMsg(res.message);
        setState(pre => ({
          ...pre,
          isLoading: false,
        }));
      }
    } catch (error) {
      console.log(error);
      setState(pre => ({
        ...pre,
        isLoading: false,
      }));
    }
  };

  useEffect(() => {
    getListHistory();
  }, []);

  return (
    <Screen>
      <Header text="History" />

      {isLoading ? (
        <ActivityIndicator
          color={myColors.primary}
          size="large"
          style={{height: '85%'}}
        />
      ) : (
        <FlashList
          contentContainerStyle={{paddingTop: 10}}
          data={listHistory}
          estimatedItemSize={WINDOW_WIDTH}
          numColumns={3}
          renderItem={({item}) => (
            <HistoryItem
              name={item.name}
              readingChapter={item.readingChapter}
              image={item.image}
              numOfChapter={item.numOfChapter}
              onPress={() => {
                if (item.readingChapter) {
                  navigate('readcomic', {
                    id: item.id,
                    chapter: item.readingChapter,
                    needLoadComic: true,
                    image: item.image,
                    name: item.name,
                    numOfChapter: item.numOfChapter,
                  });
                } else {
                  push('comicdetail', {id: item.id});
                }
              }}
            />
          )}
        />
      )}
    </Screen>
  );
};

export default ReadingHistory;

const styles = StyleSheet.create({});
