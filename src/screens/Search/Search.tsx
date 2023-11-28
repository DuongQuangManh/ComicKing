import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Screen} from '../screen';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {Icon, Icons, Text, ListEmpty, ListFooter} from '@components';
import {goBack, push} from '@navigations';
import {IComic} from '@models';
import {sendRequest} from '@api';
import {FlashList} from '@shopify/flash-list';
import ComicSearchedItem from './components/ComicSearchedItem';
import { useAppTheme } from '@hooks';

type StateType = {
  txtSearch: string;
  listComic: IComic[];
  isLoading: boolean;
  isLoadMore: boolean;
  canLoadMore: boolean;
  txtSearching: string;
};

const Search = () => {
  const theme = useAppTheme();
  const [state, setState] = useState<StateType>({
    txtSearch: '',
    txtSearching: '',
    listComic: [],
    isLoading: false,
    isLoadMore: false,
    canLoadMore: true,
  });
  const {
    txtSearch,
    listComic,
    isLoadMore,
    isLoading,
    canLoadMore,
    txtSearching,
  } = state;
  const dataReq = useRef({
    skip: 0,
    limit: 15,
    name: '',
    sort: 'hot',
  }).current;

  const searchComic = async () => {
    let path = 'api/user/findComic';
    dataReq.name = txtSearch;
    dataReq.skip = 0
    setState(pre => ({...pre, isLoading: true}));
    const respone = await sendRequest(path, dataReq);
    if (respone?.err == 200) {
      if (respone.data?.length >= dataReq.limit) {
        setState(pre => ({
          ...pre,
          isLoading: false,
          canLoadMore: true,
          listComic: respone.data,
          txtSearching: txtSearch,
        }));
      } else {
        setState(pre => ({
          ...pre,
          isLoading: false,
          canLoadMore: false,
          listComic: respone.data,
          txtSearching: txtSearch,
        }));
      }
    } else {
      setState(pre => ({
        ...pre,
        isLoading: false,
        canLoadMore: false,
        listComic: [],
        txtSearching: '',
      }));
      helper.showErrorMsg(respone?.message);
    }
  };

  const loadMoreComic = async () => {
    let path = 'api/user/findComic';
    dataReq.skip = state.listComic.length;
    setState(pre => ({...pre, isLoadMore: true}));
    const respone = await sendRequest(path, dataReq);
    if (respone?.err == 200) {
      if (respone.data?.length >= dataReq.limit) {
        setState(pre => ({
          ...pre,
          txtSearching: txtSearch,
          isLoadMore: false,
          canLoadMore: true,
          listComic: [...state.listComic, ...respone.data],
        }));
      } else {
        setState(pre => ({
          ...pre,
          txtSearching: txtSearch,
          isLoadMore: false,
          canLoadMore: false,
          listComic: [...state.listComic, ...respone.data],
        }));
      }
    } else {
      setState(pre => ({
        ...pre,
        isLoadMore: false,
        canLoadMore: false,
        listComic: [],
        txtSearching,
      }));
      helper.showErrorMsg(respone?.message);
    }
  };

  const onSubmit = () => {
    if (txtSearch) {
      searchComic();
    }
  };

  return (
    <Screen
      style={{paddingHorizontal: 14}}>
      <View style={styles.headerContainer}>
        <View style={[styles.searchContainer,{backgroundColor: theme.gray}]}>
          <Icon
            name="search"
            type={Icons.Ionicons}
            color={theme.textHint}
            size={20}
          />
          <TextInput
            value={txtSearch}
            onChangeText={value =>
              setState(pre => ({...pre, txtSearch: value}))
            }
            style={[styles.inputSearch,{color: theme.text}]}
            onSubmitEditing={onSubmit}
            placeholder="Tác giả / Tác phẩm"
            cursorColor={myColors.primary}
            placeholderTextColor={theme.textHint}
            autoFocus
          />
          {txtSearch && (
            <TouchableOpacity
              onPress={() => {
                setState(pre => ({
                  ...pre,
                  txtSearch: '',
                  txtSearching: '',
                  listComic: [],
                  isLoading: false,
                  canLoadMore: true,
                  isLoadMore: false,
                }));
              }}>
              <Icon
                name="close-circle"
                type={Icons.Ionicons}
                color={theme.text}
              />
            </TouchableOpacity>
          )}
        </View>
        <View style={{width: 10}} />
        <TouchableOpacity onPress={goBack}>
          <Icon
            name={'close-outline'}
            type={Icons.Ionicons}
            color={myColors.textHint}
          />
        </TouchableOpacity>
      </View>
      <View>
        {txtSearching && listComic.length > 0 && (
          <Text type="light_14" style={{marginVertical: 12}}>
            Đang tìm kiếm với từ khóa "{txtSearching}" :{' '}
          </Text>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={myColors.primary}
          style={{height: '100%'}}
        />
      ) : (
        <>
          {txtSearching && (
            <FlashList
              showsVerticalScrollIndicator={false}
              estimatedItemSize={WINDOW_WIDTH - 28}
              data={listComic}
              renderItem={({item}) => (
                <ComicSearchedItem
                  onPress={() => push('comicdetail', {id: item.id})}
                  name={item.name}
                  numOfChapter={item.numOfChapter}
                  numOfLike={item.numOfLike}
                  description={item.description}
                  image={item.image}
                  numOfFollow={item.numOfFollow}
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
        </>
      )}
    </Screen>
  );
};

export default Search;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    marginTop: 15,
  },
  inputSearch: {
    flex: 1,
    paddingStart: 8,
    fontSize: 13,
    color: myColors.text,
  },
  searchContainer: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: myColors.gray,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
