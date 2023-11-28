import {
  ActivityIndicator,
  Animated,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {Screen} from '../screen';
import {Header, Icon, Icons, Text} from '@components';
import {WINDOW_WIDTH, helper, myColors, myTheme} from '@utils';
import FastImage from 'react-native-fast-image';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {sendRequest} from '@api';
import {Decorate} from '@models';
import {FlashList} from '@shopify/flash-list';
import LinearGradient from 'react-native-linear-gradient';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigations';
import {changeAvatarTitleAction} from '@redux/userSlice';
import { useAppTheme } from '@hooks';

type TabType = {
  type: 'level' | 'event' | 'vip';
  index: number;
  label: string;
};

type StateType = {
  listAvttitle: Decorate[];
  loading: boolean;
  selectedTab: TabType;
  selectedTitle: Decorate | null;
  haveCount: number;
};

const TABS: TabType[] = [
  {
    type: 'level',
    label: 'Level Title',
    index: 1,
  },
  {
    type: 'vip',
    label: 'Vip Title',
    index: 2,
  },
];

const ITEM_WIDTH = Math.round(WINDOW_WIDTH / 3);
const TAB_WIDTH = Math.round(WINDOW_WIDTH / 2);

const EditAvtTitle = () => {
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const {
    wallet,
    avatarTitle,
    document: {id},
  } = useAppSelector(state => state.userSlice);
  const [state, setState] = useState<StateType>({
    listAvttitle: [],
    loading: true,
    selectedTab: TABS[0],
    selectedTitle: avatarTitle ? {...avatarTitle} : null,
    haveCount: 0,
  });
  const {loading, selectedTitle, selectedTab, listAvttitle, haveCount} = state;

  const animatedValue = useRef(new Animated.Value(1)).current;
  const translateX = animatedValue.interpolate({
    inputRange: [1, TABS.length],
    outputRange: [0, TAB_WIDTH * 1],
  });

  const getListAvtTitle = async (type: string) => {
    setState(pre => ({...pre, loading: true}));
    const respone = await sendRequest('api/user/findDecorate', {
      userId: id,
      type,
      tag: 'title',
    });
    setState(pre => ({...pre, loading: false}));
    const {err, message, data = [], haveCount = 0} = respone;
    if (err == 200) {
      setState(pre => ({...pre, listAvttitle: data, haveCount}));
    } else {
      helper.showErrorMsg(message);
    }
  };

  const handleClick = () => {
    if (selectedTitle) {
      if (selectedTitle.isLock) {
        navigateToHowToGet();
      } else {
        changeAvatarFrame(selectedTitle.id);
      }
    }
  };

  const changeAvatarFrame = (avatarTitleId: string) => {
    if (avatarTitleId != avatarTitle?.id) {
      dispatch(changeAvatarTitleAction({userId: id, avatarTitleId}));
    }
  };

  const navigateToHowToGet = () => {};

  useEffect(() => {
    getListAvtTitle(selectedTab?.type);
    Animated.timing(animatedValue, {
      toValue: selectedTab?.index,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selectedTab]);

  const _renderTabs = useMemo(() => {
    return (
      <View style={{flexDirection: 'row'}}>
        {TABS.map(item => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item.type}
            onPress={() => {
              if (loading || selectedTab.type == item.type) return;
              setState(pre => ({...pre, selectedTab: item}));
            }}
            style={styles.tabBtn}>
            <Text
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

  const _renderItem = useCallback(
    ({item}: {item: Decorate}) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setState(pre => ({...pre, selectedTitle: item}))}
          style={styles.btnItem}>
          {item.id == selectedTitle?.id && (
            <View
              style={{
                position: 'absolute',
                width: ITEM_WIDTH - 15,
                height: 60,
                borderRadius: 20,
                backgroundColor: item.isLock ? 'gray' : myColors.primary,
                opacity: 0.15,
              }}
            />
          )}
          <FastImage
            tintColor={item.isLock ? 'gray' : ''}
            style={{width: ITEM_WIDTH - 30, height: 60}}
            source={{uri: item.image}}
            resizeMode="contain"
          />
          {item.isLock && (
            <Icon
              color={myColors.primary}
              type={Icons.MaterialIcons}
              name="lock"
              size={24}
              style={{position: 'absolute'}}
            />
          )}
        </TouchableOpacity>
      );
    },
    [selectedTitle],
  );

  return (
    <Screen>
      <Header text="Danh Hiệu" />
      <View style={styles.imgContainer}>
        <FastImage
          source={
            avatarTitle
              ? {uri: avatarTitle.image}
              : require('@assets/images/avatarTitle.png')
          }
          style={{position: 'absolute', width: 140, height: 60}}
          resizeMode="contain"
        />
      </View>
      <View style={{paddingStart: 18}}>
        {/* <Text type='regular_15'>* Vip point: {vipPoint}</Text> */}
        <Text type="regular_15">* Level point: {wallet?.exp}</Text>
        <Text type="regular_15">* Đang có: {haveCount}</Text>
      </View>
      <LinearGradient
        colors={[myColors.primary, myColors.primary_80]}
        style={styles.linearContainer}>
        <View>
          <FastImage
            source={
              selectedTitle
                ? {uri: selectedTitle.image}
                : require('@assets/images/avatarTitle.png')
            }
            style={{width: 140, height: 50, alignSelf: 'center'}}
            resizeMode="contain"
          />
          <View
            style={{
              paddingStart: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{width: '70%'}}>
              <Text
                type="regular_14"
                color="#fff"
                numberOfLines={2}
                ellipsizeMode="tail">
                * {selectedTitle?.description}
              </Text>
              <Text color="#fff" type="regular_14">
                * Require point : {selectedTitle?.needPoint}
              </Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              {selectedTitle?.id != avatarTitle?.id && (
                <TouchableOpacity
                  onPress={handleClick}
                  style={styles.actionBtn}>
                  <Text type="medium_14">
                    {!selectedTitle?.isLock ? 'Sử dụng' : 'Lấy ngay'}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
      {_renderTabs}
      {loading ? (
        <ActivityIndicator
          color={myColors.primary}
          size="large"
          style={{height: 250, width: '100%'}}
        />
      ) : (
        <FlatList
          numColumns={3}
          style={{backgroundColor: theme.gray}}
          // estimatedItemSize={ITEM_WIDTH}
          data={listAvttitle}
          showsVerticalScrollIndicator={false}
          renderItem={_renderItem}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <FastImage
                tintColor="gray"
                source={require('@assets/images/empty.png')}
                style={{width: 80, height: 80}}
              />
              <Text color="gray">List is empty</Text>
            </View>
          )}
        />
      )}
    </Screen>
  );
};

export default EditAvtTitle;

const styles = StyleSheet.create({
  imgContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  btnItem: {
    width: ITEM_WIDTH,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionBtn: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
  },
  linearContainer: {
    margin: 12,
    paddingHorizontal: 10,
    paddingBottom: 14,
    borderRadius: 5,
  },
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
    width: TAB_WIDTH,
  },
});
