import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {IAuthor} from '@models';
import {Screen} from '../screen';
import {Header, Text, ListEmpty, ListFooter} from '@components';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {FlashList} from '@shopify/flash-list';
import {sendRequest} from '@api';
import {useAppSelector} from '@redux/store';
import AuthorItem from './components/AuthorItem';
import {push} from '@navigations';

type StateType = {
  listAuthor: IAuthor[];
  isLoading: boolean;
  isLoadMore: boolean;
  canLoadMore: boolean;
};

const AuthorFollowing = () => {
  const {id} = useAppSelector(state => state.userSlice.document ?? {});
  const [state, setState] = useState<StateType>({
    listAuthor: [],
    isLoading: true,
    isLoadMore: false,
    canLoadMore: true,
  });
  const {listAuthor, isLoadMore, isLoading, canLoadMore} = state;
  const dataReq = useRef({
    skip: 0,
    limit: 15,
  }).current;

  useEffect(() => {
    getListAuthor();
  }, []);

  const getListAuthor = async () => {
    setState(pre => ({...pre, isLoading: true}));
    try {
      const respone = await sendRequest('api/user/getAuthorFollowing', {
        userId: id,
        ...dataReq,
      });
      if (respone.err == 200) {
        setState(pre => ({
          ...pre,
          listAuthor: respone.data ?? [],
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

  const loadMoreAuthor = async () => {
    dataReq.skip = listAuthor.length;
    setState(pre => ({...pre, isLoading: true}));
    try {
      const respone = await sendRequest('api/user/category/getListComic', {
        userId: id,
        ...dataReq,
      });
      if (respone.err == 200) {
        setState(pre => ({
          ...pre,
          listAuthor: [...state.listAuthor, ...(respone.data ?? [])],
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

  return (
    <Screen>
      <Header text="Tác giả" />
      {isLoading ? (
        <ActivityIndicator
          color={myColors.primary}
          size="large"
          style={{height: '85%'}}
        />
      ) : (
        <>
          <Text type="medium_18" style={{paddingHorizontal: 14}}>
            Đang theo dõi: {listAuthor.length}
          </Text>
          <FlashList
            contentContainerStyle={{paddingTop: 20}}
            data={listAuthor}
            estimatedItemSize={WINDOW_WIDTH}
            renderItem={({item}) => (
              <AuthorItem
                name={item.name}
                description={item.description}
                image={item.image}
                numOfComic={item.numOfComic}
                numOfFollow={item.numOfFollow}
                onPress={() => push('author', {id: item.id, type: 'author'})}
              />
            )}
            onEndReached={() => {
              if (!isLoadMore && canLoadMore) {
                loadMoreAuthor();
              }
            }}
            ListEmptyComponent={() => <ListEmpty />}
            ListFooterComponent={() => (
              <ListFooter
                length={listAuthor.length ?? 0}
                canLoadMore={canLoadMore}
                isLoadMore={isLoadMore}
              />
            )}
          />
        </>
      )}
    </Screen>
  );
};

export default AuthorFollowing;

const styles = StyleSheet.create({});
