import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useMemo, useState, useRef, useEffect} from 'react';
import {Screen} from '../screen';
import {Header, ListEmpty, Text} from '@components';
import FastImage from 'react-native-fast-image';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {sendRequest} from '@api';
import ComicRankItem from './components/ComicRankItem';
import {navigate} from '@navigations';
import UserRankItem from './components/UserRankItem';
import { useAppSelector } from '@redux/store';
import { useAppTheme } from '@hooks';

type TabType = {
  index: number;
  name: string;
  title: string;
  api: string;
  itemType: 'hot' | 'level' | 'purchase';
};

const TABS: TabType[] = [
  {
    index: 0,
    name: 'hot',
    title: 'Truyện Hot',
    api: 'api/user/getRankHotComic',
    itemType: 'hot',
  },
  {
    index: 1,
    name: 'new',
    title: 'Truyện Mới',
    api: 'api/user/getRankNewComic',
    itemType: 'hot',
  },
  {
    index: 2,
    name: 'done',
    title: 'Hoàn Thành',
    api: 'api/user/getRankDoneComic',
    itemType: 'hot',
  },
  {
    index: 3,
    name: 'level',
    title: 'Top Level',
    api: 'api/user/getRankUserLevel',
    itemType: 'level',
  },
  {
    index: 4,
    name: 'purchase',
    title: 'Top Nạp',
    api: 'api/user/getRankUserPurchase',
    itemType: 'purchase',
  },
];

type StateType = {
  selectedTab: TabType;
  listComic: any[];
  isLoading: boolean;
};

const BANNER_HEIGHT = WINDOW_WIDTH * 0.65;
const TAB_WIDTH = 110;

const Rank = () => {
  const scrollRef = useRef<ScrollView>(null);
  const theme = useAppTheme()
  const [state, setState] = useState<StateType>({
    selectedTab: TABS?.[0],
    listComic: [],
    isLoading: true,
  });
  const {selectedTab, listComic, isLoading} = state;
  const colorTheme = useAppSelector(state => state.userSlice.colorTheme);
  const dividerAnimated = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    const translateX = interpolate(
      dividerAnimated.value,
      [0, TABS.length - 1],
      [0, (TABS.length - 1) * TAB_WIDTH],
      {
        extrapolateRight: Extrapolation.CLAMP,
      },
    );

    return {
      transform: [{translateX}],
    };
  });

  useEffect(() => {
    if (selectedTab) {
      getListComic();
      dividerAnimated.value = withTiming(selectedTab.index, {duration: 300});
    }
  }, [selectedTab]);

  const getListComic = async () => {
    setState(pre => ({...pre, isLoading: true, listComic: []}));
    try {
      const respone = await sendRequest(selectedTab.api);
      if (respone.err == 200) {
        setState(pre => ({
          ...pre,
          listComic: respone.data ?? [],
          isLoading: false,
        }));
      } else {
        helper.showErrorMsg(respone.message);
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

  const _renderTabsBar = useMemo(
    () => (
      <ScrollView
        style={{backgroundColor: colorTheme == 'light' ? myColors.background : myColors.backgroundDark}}
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {TABS.map(item => (
          <TouchableOpacity
            key={item.name}
            onPress={() => {
              setState(pre => ({...pre, selectedTab: item}));
              scrollRef.current?.scrollTo({
                x: TAB_WIDTH * item.index - (WINDOW_WIDTH / 2 - TAB_WIDTH / 2),
                y: 0,
                animated: true,
              });
            }}
            activeOpacity={0.7}
            style={{
              width: TAB_WIDTH,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color:
                  selectedTab.name == item.name
                    ? theme.primary
                    : theme.text,
              }}
              type={selectedTab.name == item.name ? 'medium_16' : 'regular_16'}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            animatedStyles,
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 3,
              width: TAB_WIDTH,
              zIndex: 10,
              backgroundColor: myColors.primary,
            },
          ]}
        />
      </ScrollView>
    ),
    [selectedTab],
  );

  return (
    <Screen unsafe statusBarColor="transparent" translucent>
      <View style={{height: BANNER_HEIGHT, position: 'absolute', zIndex: -1}}>
        <FastImage
          source={{
            uri: 'https://ik.imagekit.io/c7aqey5nn/banner/banner5.jpg?updatedAt=1698636090081',
          }}
          style={{width: WINDOW_WIDTH, height: BANNER_HEIGHT}}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}>
          <Header
            text="Bảng Xếp Hạng"
            color="#fff"
            backgroundColor="transparent"
            style={{
              top: 24,
              position: 'absolute',
            }}
          />
        </View>
      </View>
      <View
        style={{
          marginTop: BANNER_HEIGHT - 10,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          paddingTop: 6,
          backgroundColor: theme.background,
        }}>
        {_renderTabsBar}
      </View>
      <View style={{flex: 1, backgroundColor: colorTheme == 'light' ? '#fff' : myColors.backgroundDark}}>
        {isLoading ? (
          <ActivityIndicator
            color={myColors.primary}
            size="large"
            style={{height: '85%'}}
          />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 14,
              paddingTop: 16,
            }}
            data={listComic}
            renderItem={({item, index}) => (
              <>
                {selectedTab.itemType == 'hot' ? (
                  <ComicRankItem
                    image={item.image}
                    name={item.name}
                    rank={index + 1}
                    author={item.author}
                    description={item.description}
                    type={selectedTab.itemType}
                    numOfView={item.numOfView}
                    onPress={type => {
                      if (type == 'hot') {
                        navigate('comicdetail', {id: item.id});
                      } else {
                      }
                    }}
                  />
                ) : (
                  <UserRankItem
                    image={item.image}
                    name={item.fullName}
                    rank={index + 1}
                    type={selectedTab.itemType}
                    avatarFrame={item.avatarFrame}
                    avatarTitle={item.avatarTitle}
                    level={item.level}
                    onPress={type => {
                      if (type == 'hot') {
                        navigate('comicdetail', {id: item.id});
                      } else {
                      }
                    }}
                  />
                )}
              </>
            )}
            ListEmptyComponent={() => <ListEmpty />}
          />
        )}
      </View>
    </Screen>
  );
};

export default Rank;

const styles = StyleSheet.create({});
