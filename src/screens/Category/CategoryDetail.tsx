import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../screen';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList, push} from '@navigations';
import {Header, ListFooter, ListEmpty} from '@components';
import {FlashList} from '@shopify/flash-list';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {IComic} from '@models';
import ComicSearchedItem from '../Search/components/ComicSearchedItem';
import {sendRequest} from '@api';

type StateType = {
  listComic: IComic[];
  isLoading: boolean;
  canLoadMore: boolean;
  isLoadMore: boolean;
};

const CategoryDetail = () => {
  const {categoryId, numOfComic, description, title} =
    useRoute<RouteProp<StackParamList, 'categoryDetail'>>().params;
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
    try {
      const respone = await sendRequest('api/user/category/getListComic', {
        categoryId,
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
      const respone = await sendRequest('api/user/category/getListComic', {
        categoryId,
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
      <Header text={title} />
      {isLoading ? (
        <ActivityIndicator
          color={myColors.primary}
          size="large"
          style={{height: '85%'}}
        />
      ) : (
        <FlashList
          contentContainerStyle={{paddingHorizontal: 14}}
          data={listComic}
          estimatedItemSize={WINDOW_WIDTH - 28}
          renderItem={({item}) => (
            <ComicSearchedItem
              onPress={() => push('comicdetail', {id: item.id})}
              name={item.name}
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

export default CategoryDetail;

const styles = StyleSheet.create({});
