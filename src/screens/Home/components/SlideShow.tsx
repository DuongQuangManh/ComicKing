import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {WINDOW_WIDTH, myColors} from '@utils';
import {IComic} from '@models';
import FastImage from 'react-native-fast-image';
import {push} from '@navigations';

type ComponentProps = {
  listComic: IComic[];
};

const SlideShow: React.FC<ComponentProps> = ({listComic = []}) => {
  const flatListRef = useRef<FlatList>(null);
  const [state, setState] = useState({
    currentIndex: 0,
    isReverse: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (listComic.length >= 2) {
      timer = setInterval(() => {
        if (state.isReverse) {
          handlePrevious();
        } else {
          handleNext();
        }
      }, 2500);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [listComic, state]);

  const handleNext = () => {
    if (state.currentIndex < listComic.length - 1) {
      let index = state.currentIndex + 1;
      setState(pre => ({...pre, currentIndex: index}));
      flatListRef.current?.scrollToIndex({index});
    } else {
      let index = state.currentIndex - 1;
      setState(pre => ({...pre, currentIndex: index, isReverse: true}));
      flatListRef.current?.scrollToIndex({index});
    }
  };

  const handlePrevious = () => {
    if (state.currentIndex <= 0) {
      let index = state.currentIndex + 1;
      setState(pre => ({...pre, currentIndex: index, isReverse: false}));
      flatListRef.current?.scrollToIndex({index});
    } else {
      let index = state.currentIndex - 1;
      setState(pre => ({...pre, currentIndex: index}));
      flatListRef.current?.scrollToIndex({index});
    }
  };

  const renderItem = useCallback(
    ({item}: {item: IComic}) => (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          if (item.id) push('comicdetail', {id: item.id});
        }}
        style={styles.slide}>
        <FastImage
          style={styles.image}
          source={{uri: item.banner ? item.banner : item.image}}
        />
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={listComic.slice(0, 6)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={0}
        onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({index: info.index});
          });
        }}
        onMomentumScrollEnd={event => {
          const slideIndex = Math.floor(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width,
          );
          setState(pre => ({...pre, currentIndex: slideIndex}));
        }}
      />
      <View style={styles.paginationContainer}>
        {listComic.map((_, index) => {
          return (
            <View
              key={index}
              style={{
                marginHorizontal: 2,
                width: 8,
                height: 8,
                borderRadius: 5,
                backgroundColor: myColors.primary,
                opacity: state.currentIndex == index ? 0.9 : 0.2,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default SlideShow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 14,
    minHeight: 220,
  },
  slide: {
    width: WINDOW_WIDTH,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  paginationContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
  },
});
