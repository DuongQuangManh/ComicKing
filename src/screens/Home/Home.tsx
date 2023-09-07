import {StyleSheet, Text, View, FlatList, Animated} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {Screen} from '../screen';
import {HeaderHome} from '@components';
import {Comic, Type, myColors} from '@utils';
import {ItemComic, ItemType} from '@items';

const Home = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const animatedHeaderVisible = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const listener = scrollY.addListener(({value}) => {
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
    <Screen preset="fixed" style={{paddingBottom: 70}}>
      <Animated.View
        style={{
          transform: [{translateY}],
        }}>
        <HeaderHome />
        <FlatList
          data={Type}
          renderItem={({item}) => <ItemType item={item} />}
          horizontal
          style={styles.type}
        />
        <FlatList
          data={Comic}
          renderItem={({item}) => <ItemComic item={item} />}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
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
