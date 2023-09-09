import { StyleSheet, FlatList, Animated } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Screen } from '../screen';
import { HeaderHome } from '@components';
import { helper, myColors } from '@utils';
import { ComicItem, CategoryItem } from '@items';
import { StackParamList, navigate } from '@navigations';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { getCate } from '@redux/categorySlice';
import { RouteProp, useRoute } from '@react-navigation/native';

export const comicData = [
  {
    id: 1,
    name: 'Cuộc phiêu lưu của biệt đội vô cực ',
    image:
      'https://dccomicsnews.com/wp-content/uploads/2022/07/I-Am-Batman-11-2-Banner.jpg',
    chapter: 330,
    time: '2 ngày trước',
    type: 'Manga',
  },
  {
    id: 2,
    name: 'Biệt đột vô cực và DATN',
    image:
      'https://i.pinimg.com/736x/d4/e3/82/d4e382fcf262bf05754eafa0fdf10bb5--greg-berlanti-arrow-tv-series.jpg',
    chapter: 933,
    time: '1 ngày trước',
    type: 'Manga',
  },
  {
    id: 3,
    name: 'Sự tích bí ẩn của DATN',
    image:
      'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/12/DC-Rebirth-Banner.jpg',
    chapter: 1070,
    time: '3 ngày trước',
    type: 'Manhwa',
  }, {
    id: 4,
    name: 'Biệt đột vô cực và DATN',
    image:
      'https://i.pinimg.com/736x/d4/e3/82/d4e382fcf262bf05754eafa0fdf10bb5--greg-berlanti-arrow-tv-series.jpg',
    chapter: 933,
    time: '1 ngày trước',
    type: 'Manga',
  },
  {
    id: 5,
    name: 'Sự tích bí ẩn của DATN',
    image:
      'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/12/DC-Rebirth-Banner.jpg',
    chapter: 1070,
    time: '3 ngày trước',
    type: 'Manhwa',
  }, {
    id: 6,
    name: 'Biệt đột vô cực và DATN',
    image:
      'https://i.pinimg.com/736x/d4/e3/82/d4e382fcf262bf05754eafa0fdf10bb5--greg-berlanti-arrow-tv-series.jpg',
    chapter: 933,
    time: '1 ngày trước',
    type: 'Manga',
  },
  {
    id: 7,
    name: 'Sự tích bí ẩn của DATN',
    image:
      'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/12/DC-Rebirth-Banner.jpg',
    chapter: 1070,
    time: '3 ngày trước',
    type: 'Manhwa',
  },
];

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedHeaderVisible = useRef(new Animated.Value(0)).current;
  const { registerSuccess } = useRoute<RouteProp<StackParamList, 'home'>>().params ?? {}

  const dispatch = useAppDispatch();
  const dataCate = useAppSelector(state => state.categorySlice.data);

  useEffect(() => {
    dispatch(getCate());
    if (registerSuccess)
      helper.showSuccessMsg('Đăng kí tài khoản thành công.')
  }, []);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value < 70) {
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
  return (
    <Screen preset="fixed" style={{ paddingBottom: 70 }}>
      <Animated.View
        style={{
          transform: [{ translateY }],
        }}>
        <HeaderHome onClick={() => navigate('menu')} />
        <FlatList
          data={dataCate}
          renderItem={({ item }) => <CategoryItem item={item} />}
          horizontal
          style={styles.type}
        />
        <FlatList
          data={comicData}
          renderItem={({ item }) => <ComicItem item={item} />}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
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
    height: 55,
  },
});
