import { StyleSheet, FlatList, Animated, ScrollView, View } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { Screen } from '../screen';
import HeaderHome from './components/HeaderHome';
import { WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors } from '@utils';
import { StackParamList, navigate } from '@navigations';
import { useAppDispatch, useAppSelector } from '@redux/store';
import { getCate } from '@redux/categorySlice';
import { RouteProp, useRoute } from '@react-navigation/native';
import FlatListCustom from './components/FlatListCustom';
import LeaderBoard from './components/LeaderBoard';
import FastImage from 'react-native-fast-image';
import homeSlice from '@redux/homeSlice';

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

  const dispatch = useAppDispatch();
  const dataCate = useAppSelector(state => state.categorySlice.data);
  const comics = useAppSelector(state => state.homeSlice);

  useEffect(() => {
    dispatch(getCate());
  }, []);
  const offsetY = useRef(70);

  return (
    <Screen preset="scroll">
      <HeaderHome onClick={() => navigate('menu')}/>
      <View style={{ paddingBottom: 70, paddingTop: 80 }}>
        {/* <Carousel
            nestedScrollEnabled={true}
            data={comics.sliderComic}
            renderItem={({item}) => (
              <FastImage
                source={{
                  uri: item.image,
                }}
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
          /> */}
        <FlatListCustom label="Propose" data={comics.proposeComics} />
        <FlatListCustom
          label="Newest"
          isMore={true}
          data={comics.newestComic}
          isItemLarge={false}
        />
        <FlatListCustom label="Hot" data={comicData} />

        <FlatListCustom label="Popular" data={comicData} />
        <FlatListCustom label="Popular" data={comicData} isItemLarge={true} />
        <LeaderBoard />
      </View>
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
