import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  clamp,
} from 'react-native-reanimated';
import {Screen} from '../screen';
import HeaderHome from './components/HeaderHome';
import {WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors} from '@utils';
import {StackParamList, navigate} from '@navigations';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {getCate} from '@redux/categorySlice';
import {RouteProp, useRoute} from '@react-navigation/native';
import FlatListCustom from './components/FlatListCustom';
import LeaderBoard from './components/LeaderBoard';
import FastImage from 'react-native-fast-image';
import homeSlice from '@redux/homeSlice';
import {Icon, Icons} from '@components';

export const comicData = [
  {
    id: 1,
    name: 'Cuộc phiêu lưu của biệt đội vô cực ',
    description: 'đây là biệt đội vô cực chuyên đi xử lí xác sống ngoài vũ trụ',
    author: 'dqmanh',
    image:
      'https://dccomicsnews.com/wp-content/uploads/2022/07/I-Am-Batman-11-2-Banner.jpg',
    chapter: 330,
    time: '2 ngày trước',
    type: 'Manga',
    view: 120000,
  },
  {
    id: 2,
    name: 'Biệt đột vô cực và DATN',
    description: 'đây là biệt đội vô cực chuyên đi xử lí xác sống ngoài vũ trụ',

    image:
      'https://i.pinimg.com/736x/d4/e3/82/d4e382fcf262bf05754eafa0fdf10bb5--greg-berlanti-arrow-tv-series.jpg',
    chapter: 933,
    time: '1 ngày trước',
    type: 'Manga',
    view: 112000,
    author: 'dqmanh',
  },
  {
    id: 3,
    name: 'Sự tích bí ẩn của DATN',
    description: 'đây là biệt đội vô cực chuyên đi xử lí xác sống ngoài vũ trụ',

    image:
      'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/12/DC-Rebirth-Banner.jpg',
    chapter: 1070,
    time: '3 ngày trước',
    type: 'Manhwa',
    view: 109000,
    author: 'dqmanh',
  },
  {
    id: 4,
    name: 'Biệt đột vô cực và DATN',
    description: 'đây là biệt đội vô cực chuyên đi xử lí xác sống ngoài vũ trụ',

    image:
      'https://i.pinimg.com/736x/d4/e3/82/d4e382fcf262bf05754eafa0fdf10bb5--greg-berlanti-arrow-tv-series.jpg',
    chapter: 933,
    time: '1 ngày trước',
    type: 'Manga',
    view: 92000,
    author: 'dqmanh',
  },
  {
    id: 5,
    name: 'Sự tích bí ẩn của DATN',
    description: 'đây là biệt đội vô cực chuyên đi xử lí xác sống ngoài vũ trụ',

    image:
      'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/12/DC-Rebirth-Banner.jpg',
    chapter: 1070,
    time: '3 ngày trước',
    type: 'Manhwa',
    view: 91000,
    author: 'dqmanh',
  },
];

const HEADER_HEIGHT = 56;

const Home = () => {
  const dispatch = useAppDispatch();
  const comics = useAppSelector(state => state.homeSlice);

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

  useEffect(() => {
    dispatch(getCate());
  }, []);

  return (
    <>
      <Animated.View style={[styles.headerStyle, animatedStyles]}>
        <View style={{flex: 1}}></View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigate('search')}>
            <Icon type={Icons.Ionicons} name="search-outline" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate('comicWorld')}
            style={{marginHorizontal: 10}}>
            <Icon
              type={Icons.MaterialCommunityIcons}
              name="view-dashboard-outline"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('notification')}>
            <Icon type={Icons.Ionicons} name="notifications-outline" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingTop: HEADER_HEIGHT,
          backgroundColor: myColors.background,
        }}
        onScroll={scrollHandler}>
        <View>
          <FlatListCustom label="Đề xuất" data={comics.proposeComics} />
          <FlatListCustom
            label="Mới nhất"
            isMore={true}
            data={comics.newestComic}
            isItemLarge={false}
          />
          <LeaderBoard />
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
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});
