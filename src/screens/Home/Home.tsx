import {
  StyleSheet,
  FlatList,
  Animated,
  ScrollView,
  Image,
  View,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {Screen} from '../screen';
import HeaderHome from './components/HeaderHome';
import {WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors} from '@utils';
import {ComicItem, CategoryItem, ComicItemSmall} from '@items';
import {StackParamList, navigate} from '@navigations';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {getCate} from '@redux/categorySlice';
import {RouteProp, useRoute} from '@react-navigation/native';
import FlatListCustom from './components/FlatListCustom';
import Carousel from 'react-native-snap-carousel';
import LeaderBoard from './components/LeaderBoard';

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

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedHeaderVisible = useRef(new Animated.Value(0)).current;
  const {registerSuccess} =
    useRoute<RouteProp<StackParamList, 'home'>>().params ?? {};

  const dispatch = useAppDispatch();
  const dataCate = useAppSelector(state => state.categorySlice.data);

  useEffect(() => {
    dispatch(getCate());
    if (registerSuccess) helper.showSuccessMsg('Đăng kí tài khoản thành công.');
  }, []);
  const offsetY = useRef(70);
  useEffect(() => {
    const listener = scrollY.addListener(({value}) => {
      if (value < offsetY.current) {
        Animated.timing(animatedHeaderVisible, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      } else if (value === 0) {
        Animated.timing(animatedHeaderVisible, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.timing(animatedHeaderVisible, {
          toValue: 1,
          duration: 100,
          useNativeDriver: false,
        }).start();
      }
      offsetY.current = value;
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, []);

  const translateY = animatedHeaderVisible.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -75],
    extrapolate: 'clamp',
  });

  const cateFirst = {
    id: 'all',
    title: 'All',
    description: 'all',
    numOfComic: -1,
  };
  return (
    <Screen preset="fixed">
      <Animated.View
        style={{
          transform: [{translateY}],
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
        }}>
        <HeaderHome onClick={() => navigate('menu')} />
      </Animated.View>
      <ScrollView
        nestedScrollEnabled={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {
            useNativeDriver: false,
          },
        )}>
        <View style={{paddingBottom: 70, paddingTop: 80}}>
          <Carousel
            nestedScrollEnabled={true}
            data={comicData}
            renderItem={({item}) => (
              <Image
                source={{uri: item.image}}
                style={{
                  width: WINDOW_WIDTH - 30,
                  height: WINDOW_HEIGHT / 3 - 10,
                  borderRadius: 18,
                }}
              />
            )}
            sliderWidth={WINDOW_WIDTH}
            itemWidth={WINDOW_WIDTH - 25}
            itemHeight={WINDOW_HEIGHT / 3}
            loop={true}
            autoplay={true}
            autoplayDelay={3000}
          />
          <FlatListCustom
            nestedScrollEnabled={true}
            label="Hot"
            data={comicData}
            renderItem={({item}) => <ComicItemSmall item={item} />}
            horizontal
          />
          <FlatListCustom
            nestedScrollEnabled={true}
            label="Popular"
            data={comicData}
            renderItem={({item}) => <ComicItemSmall item={item} />}
            horizontal
          />
          <LeaderBoard />
          <FlatList
            nestedScrollEnabled={true}
            data={dataCate}
            ListHeaderComponent={() => <CategoryItem item={cateFirst} />}
            renderItem={({item}) => (
              <CategoryItem item={item} isShowNumberComic={true} />
            )}
            horizontal
            style={styles.type}
            showsHorizontalScrollIndicator={false}
          />
          <FlatList
            nestedScrollEnabled={true}
            data={comicData}
            renderItem={({item}) => <ComicItem item={item} />}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </Screen>
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
});
