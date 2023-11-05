import {Animated, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useEffect, useRef, useState} from 'react';
import {Header, Icons, ListEmpty, ListFooter, Text} from '@components';
import {Screen} from '../screen';
import {WINDOW_WIDTH, constants, helper, myColors} from '@utils';
import {ActivityIndicator} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {IComic} from '@models';
import ComicSearchedItem from './components/ComicSearchedItem';
import {navigate, push} from '@navigations';
import {sendRequest} from '@api';

type TabType = {
  type: 'done' | 'hot' | 'new' | 'vip';
  index: number;
  label: string;
  status?: string;
};

type SortType = {
  type: 'hot' | 'new' | 'old';
  label: string;
};

const TABS: TabType[] = [
  {
    type: 'hot',
    index: 1,
    label: 'Truyện Hot',
  },
  {
    type: 'done',
    index: 2,
    label: 'Hoàn Thành',
    status: constants.COMIC_STATUS.DONE,
  },
  {
    type: 'new',
    index: 3,
    label: 'Truyện Mới',
  },
  // {
  //   type: 'vip',
  //   index: 4,
  //   label: 'Truyện Vip',
  // },
];

const SORTS: SortType[] = [
  {
    type: 'hot',
    label: 'Hot',
  },
  {
    type: 'new',
    label: 'Mới',
  },
  {
    type: 'old',
    label: 'Cũ',
  },
];

type StateType = {
  loading: boolean;
  selectedTab: TabType;
  sortBy: 'hot' | 'new' | 'old';
  listComic: IComic[];
  isLoadMore: boolean;
  canLoadMore: boolean;
};

const ITEM_WIDTH = Math.round(WINDOW_WIDTH / TABS.length);

const ComicWorld = () => {
  const [state, setState] = useState<StateType>({
    loading: false,
    selectedTab: TABS[0],
    sortBy: 'hot',
    listComic: [],
    isLoadMore: false,
    canLoadMore: false,
  });
  const {loading, selectedTab, sortBy, listComic, isLoadMore, canLoadMore} =
    state;
  const dataReq = useRef<{
    skip: number;
    limit: number;
    status: string | undefined;
    sort: string;
  }>({
    skip: 0,
    limit: 15,
    status: TABS[0].status,
    sort: TABS[0].type,
  }).current;

  const animatedValue = useRef(new Animated.Value(1)).current;
  const translateX = animatedValue.interpolate({
    inputRange: [1, TABS.length],
    outputRange: [0, ITEM_WIDTH * (TABS.length - 1)],
  });

  useEffect(() => {
    getComic();
    Animated.timing(animatedValue, {
      toValue: selectedTab?.index,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedTab]);

  const getComic = async () => {
    let path = 'api/user/findComic';
    setState(pre => ({...pre, loading: true}));
    dataReq.skip = 0;
    const respone = await sendRequest(path, {...dataReq});
    if (respone?.err == 200) {
      if (respone.data?.length >= dataReq.limit) {
        setState(pre => ({
          ...pre,
          loading: false,
          canLoadMore: true,
          listComic: respone.data,
        }));
      } else {
        setState(pre => ({
          ...pre,
          loading: false,
          canLoadMore: false,
          listComic: respone.data,
        }));
      }
    } else {
      setState(pre => ({
        ...pre,
        loading: false,
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
          isLoadMore: false,
          canLoadMore: true,
          listComic: [...state.listComic, ...respone.data],
        }));
      } else {
        setState(pre => ({
          ...pre,
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
      }));
      helper.showErrorMsg(respone?.message);
    }
  };

  const _renderListSort = useMemo(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingHorizontal: 12,
        }}>
        {SORTS.map((item, index) => (
          <View
            key={index}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            {index > 0 && <Text> | </Text>}
            <TouchableOpacity
              onPress={() => {
                setState(pre => ({...pre, sortBy: item.type}));
              }}
              style={{
                borderBottomColor: myColors.primary,
                borderBottomWidth: sortBy == item.type ? 2 : 0,
              }}
              key={item.type}>
              <Text
                type={sortBy == item.type ? 'medium_16' : 'regular_16'}
                style={{
                  paddingHorizontal: 3,
                  color:
                    sortBy == item.type ? myColors.primary : myColors.textHint,
                }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  }, [sortBy]);

  const _renderTabs = useMemo(() => {
    return (
      <View style={{flexDirection: 'row', elevation: 2}}>
        {TABS.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => {
              if (loading || selectedTab.type == item.type) return;
              dataReq.status = item.status;
              dataReq.sort = item.type;
              setState(pre => ({...pre, selectedTab: item}));
            }}
            style={styles.tabBtn}>
            <Text
              type="medium_17"
              color={item.type == selectedTab.type ? myColors.primary : 'gray'}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[{transform: [{translateX}]}, styles.dividerTab]}
        />
      </View>
    );
  }, [selectedTab, loading]);

  return (
    <Screen>
      <Header
        text="Kênh Thế Giới"
        isIconEnd
        onClickIconEnd={() => navigate('search')}
        nameIconEnd="search"
        typeIconEnd={Icons.Ionicons}
      />
      {/* {_renderListSort()} */}
      {_renderTabs}
      {loading ? (
        <ActivityIndicator
          size="large"
          color={myColors.primary}
          style={{height: '85%'}}
        />
      ) : (
        <FlashList
          contentContainerStyle={{paddingVertical: 20, paddingHorizontal: 14}}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={WINDOW_WIDTH - 28}
          data={listComic}
          keyExtractor={(item, index) => item.id ?? index}
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
    </Screen>
  );
};

export default ComicWorld;

const styles = StyleSheet.create({
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  dividerTab: {
    position: 'absolute',
    backgroundColor: myColors.primary,
    height: 4,
    bottom: 0,
    width: ITEM_WIDTH,
  },
});
