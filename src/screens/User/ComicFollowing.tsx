import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IComic} from '@models';
import {sendRequest} from '@api';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {Screen} from '../screen';
import {Header, ListEmpty, ListFooter} from '@components';
import {FlashList} from '@shopify/flash-list';
import ComicSearchedItem from '../Search/components/ComicSearchedItem';
import {push} from '@navigations';
import {useAppSelector} from '@redux/store';

type StateType = {
  listComic: IComic[];
  isLoading: boolean;
  canLoadMore: boolean;
  isLoadMore: boolean;
};

const ComicFollowing = () => {
  const {id} = useAppSelector(state => state.userSlice.document ?? {});
  const dataReq = {
    limit: 15,
    skip: 0,
    sort: 'hot',
  };
  const [state, setState] = useState<StateType>({
    listComic: [],
    isLoading: true,
    canLoadMore: true,
    isLoadMore: false,
  });
  const {listComic, isLoadMore, isLoading, canLoadMore} = state;

  const getListComic = async () => {
    setState(pre => ({...pre, isLoading: true}));
    dataReq.skip = 0;
    try {
      const respone = await sendRequest('api/user/getComicFollowing', {
        userId: id,
        ...dataReq,
      });
      if (respone.err == 200) {
        setState(pre => ({
          ...pre,
          listComic: respone.data ?? [],
          isLoading: false,
          isLoadMore: false,
          canLoadMore: respone.data?.length >= dataReq.limit,
        }));
      } else {
        helper.showErrorMsg(respone.message);
        setState(pre => ({
          ...pre,
          isLoading: false,
          isLoadMore: false,
          canLoadMore: false,
        }));
      }
    } catch (error) {
      console.log(error);
      setState(pre => ({
        ...pre,
        isLoading: false,
        isLoadMore: false,
        canLoadMore: false,
      }));
    }
  };

  const loadMoreComic = async () => {
    dataReq.skip = listComic.length;
    setState(pre => ({...pre, isLoading: true}));
    try {
      const respone = await sendRequest('api/user/getComicFollowing', {
        userId: id,
        ...dataReq,
      });
      if (respone.err == 200) {
        setState(pre => ({
          ...pre,
          listComic: [...state.listComic, ...(respone.data ?? [])],
          isLoading: false,
          isLoadMore: true,
          canLoadMore: respone.data?.length >= dataReq.limit,
        }));
      } else {
        helper.showErrorMsg(respone.message);
        setState(pre => ({
          ...pre,
          isLoading: false,
          isLoadMore: false,
          canLoadMore: true,
        }));
      }
    } catch (error) {
      console.log(error);
      setState(pre => ({
        ...pre,
        isLoading: false,
        isLoadMore: false,
        canLoadMore: false,
      }));
    }
  };

  useEffect(() => {
    getListComic();
  }, []);

  return (
    <Screen>
      <Header text="Truyện tranh" />
      {isLoading ? (
        <ActivityIndicator
          color={myColors.primary}
          size="large"
          style={{height: '85%'}}
        />
      ) : (
        <FlashList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingHorizontal: 14}}
          data={listComic}
          estimatedItemSize={WINDOW_WIDTH - 28}
          renderItem={({item}) => (
            <ComicSearchedItem
              onPress={() => push('comicdetail', {id: item.id})}
              name={item.name}
              numOfFollow={item.numOfFollow}
              numOfChapter={item.numOfChapter}
              numOfLike={item.numOfLike}
              description={item.description}
              image={item.image}
              numOfView={item.numOfView}
            />
          )}
          onEndReached={() => {
            if (!isLoadMore && canLoadMore) {
              loadMoreComic();
            }
          }}
          ListEmptyComponent={() => <ListEmpty />}
          ListFooterComponent={() => (
            <ListFooter
              length={listComic.length}
              canLoadMore={canLoadMore}
              isLoadMore={isLoadMore}
            />
          )}
        />
      )}
    </Screen>
  );
};

export default ComicFollowing;

const styles = StyleSheet.create({});
