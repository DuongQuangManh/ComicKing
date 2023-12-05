import {
  StyleSheet,
  View,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from 'react-native';
import React, {useMemo} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {navigate} from '@navigations';
import {useAppDispatch, useAppSelector} from '@redux/store';
import FlatListCustom from './components/FlatListCustom';
import {Icon, Icons, Text} from '@components';
import SlideShow from './components/SlideShow';
import SixComicContainer from './components/SixComicContainer';
import ComicWithDescContainer from './components/ComicWithDescContainer';
import FourComicContainer from './components/FourComicContainer';
import FastImage from 'react-native-fast-image';
import HistoryListContainer from './components/HistoryListContainer';
import {useAppTheme} from '@hooks';

const HEADER_HEIGHT = 84;

const Home = () => {
  const dispatch = useAppDispatch();
  const theme = useAppTheme();
  const {
    doneComics = [],
    hotComic = [],
    newestComic = [],
    proposeComics = [],
    newestComicUpdatedChapter = [],
    readingHistory,
  } = useAppSelector(state => state.homeSlice);
  const {countNew} = useAppSelector(state => state.notificationSlice);
  const {id} = useAppSelector(state => state.userSlice.document ?? {});
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler<{prevY?: number}>({
    onBeginDrag: (event, ctx) => {
      if (ctx) ctx.prevY = event.contentOffset.y;
    },
    onScroll: (event, ctx) => {
      if (ctx) {
        let {y} = event.contentOffset;
        if (y < 0) y = 0;
        const dy = y - (ctx?.prevY ?? 0);
        scrollY.value = helper.clamp(scrollY.value + dy, 0, HEADER_HEIGHT);
        ctx.prevY = y;
      }
    },
  });
  const animatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_HEIGHT],
      [0, -HEADER_HEIGHT],
      Extrapolation.CLAMP,
    );
    return {transform: [{translateY: translateY}]};
  });

  const _renderHeader = useMemo(() => {
    return (
      <Animated.View style={[styles.headerStyle, animatedStyles]}>
        <View
          style={{
            paddingTop: 24,
            paddingHorizontal: 10,
            flex: 1,
            alignItems: 'center',

            flexDirection: 'row',
            backgroundColor: theme.background,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FastImage
              style={{width: 30, height: 30}}
              source={require('@assets/images/logo3.png')}
            />
            <Text style={{marginStart: 6}} type="medium_17">
              Comic Stuff
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.background,
            }}>
            <TouchableOpacity onPress={() => navigate('search')}>
              <Icon type={Icons.Ionicons} name="search-outline" />
            </TouchableOpacity>
            {/* <TouchableOpacity
          onPress={() => navigate('comicWorld')}
          style={{marginHorizontal: 10}}>
          <Icon
            type={Icons.MaterialCommunityIcons}
            name="view-dashboard-outline"
          />
        </TouchableOpacity> */}
            <View style={{width: 10}} />
            <TouchableOpacity onPress={() => navigate('notifications')}>
              <Icon type={Icons.Ionicons} name="notifications-outline" />
              {countNew > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'red',
                    right: 3,
                    top: 2,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  }, [theme, countNew]);

  const _renderOptions = useMemo(() => {
    return (
      <View style={styles.optionContainer}>
        <TouchableOpacity
          onPress={() => navigate('comicWorld')}
          style={styles.optionBtn}>
          <FastImage
            style={styles.optionImg}
            source={require('@assets/icons/home-options/explore.png')}
          />
          <Text type="medium_12">Khám phá</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('listCategory')}
          style={styles.optionBtn}>
          <FastImage
            style={styles.optionImg}
            source={require('@assets/icons/home-options/category.png')}
          />
          <Text type="medium_12">Thể loại</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate('rank')}
          style={styles.optionBtn}>
          <FastImage
            style={styles.optionImg}
            source={require('@assets/icons/home-options/rank.png')}
          />
          <Text type="medium_12">Xếp hạng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigate('listCoinPackage')}
          style={styles.optionBtn}>
          <FastImage
            style={styles.optionImg}
            source={require('@assets/icons/home-options/diamond.png')}
          />
          <Text type="medium_12">Nạp xu</Text>
        </TouchableOpacity>
      </View>
    );
  }, []);

  const _renderSlide = useMemo(() => {
    return <SlideShow listComic={hotComic} />;
  }, [hotComic]);

  // const _renderProposeComic = useMemo(() => {
  //   return <FlatListCustom label="🌟 Đề xuất" data={proposeComics} />;
  // }, []);

  const _renderHotComic = useMemo(() => {
    return (
      <SixComicContainer listComic={hotComic} title="🔥 Truyện Hot" isMore />
    );
  }, [hotComic]);

  const _renderNewComic = useMemo(() => {
    return (
      <ComicWithDescContainer
        listComic={newestComic}
        title="🏵️ Truyện Mới"
        isMore
      />
    );
  }, [newestComic]);

  const _renderDoneComic = useMemo(() => {
    return (
      <FourComicContainer listComic={doneComics} title="✅ Hoàn Thành" isMore />
    );
  }, [doneComics]);

  const _renderNewestUpdatedChapterComic = useMemo(() => {
    return (
      <FourComicContainer
        listComic={newestComicUpdatedChapter}
        title="✅ Mới Cập Nhật"
        isMore
        visibleType="left"
      />
    );
  }, [newestComicUpdatedChapter]);

  const _renderHistoryComic = useMemo(() => {
    return (
      <HistoryListContainer title="📚 Lịch Sử" listComic={readingHistory} />
    );
  }, [readingHistory]);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {_renderHeader}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: HEADER_HEIGHT,
          backgroundColor: theme.background,
        }}
        contentContainerStyle={{paddingBottom: 150}}
        refreshControl={
          <RefreshControl
            style={{position: 'absolute'}}
            onRefresh={() => {
              helper.getAsset(dispatch, id);
            }}
            refreshing={false}
            colors={[myColors.primary]}
          />
        }
        onScroll={scrollHandler}>
        <View>
          {_renderSlide}
          {_renderOptions}
          {_renderHistoryComic}
          <FlatListCustom label="🌟 Đề xuất" data={proposeComics} />
          {_renderNewComic}
          {_renderHotComic}
          {_renderNewestUpdatedChapterComic}
          {_renderDoneComic}
        </View>
        <View
          style={{alignItems: 'center', justifyContent: 'center', height: 60}}>
          <Text color={theme.textHint} type="regular_14">
            Không còn nội dung
          </Text>
        </View>
      </Animated.ScrollView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.background,
  },
  type: {
    marginTop: 10,
  },
  headerStyle: {
    height: HEADER_HEIGHT,
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 2,
  },
  optionBtn: {
    width: WINDOW_WIDTH / 4 - 32,
    height: WINDOW_WIDTH / 4 - 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionImg: {
    width: '70%',
    height: '70%',
    marginBottom: 3,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: 12,
    marginBottom: 8,
  },
});
