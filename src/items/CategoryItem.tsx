import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {myColors} from '@utils';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {setSelect} from '@redux/categorySlice';
interface propsItem {
  item?: any;
}
const CategoryItem: FC<propsItem> = ({item}) => {
  const dispatch = useAppDispatch();
  const handlerClick = () => {
    dispatch(setSelect(item.id));
  };

  const loading = useAppSelector(state => state.categorySlice.loading);
  const select = useAppSelector(state => state.categorySlice.select);
  const isSelect = item.id === select;
  return (
    <TouchableOpacity onPress={handlerClick}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        visible={!loading}
        width={80}
        height={40}
        style={{borderRadius: 18, marginStart: 10}}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: isSelect
                ? myColors.primary
                : myColors.background,
            },
          ]}>
          <Text
            style={[
              styles.text,
              {color: isSelect ? myColors.background : undefined},
            ]}>
            {`${item.title} ${
              item.numOfComic >= 0 ? `(${item.numOfComic})` : ''
            }`}
          </Text>
        </View>
      </ShimmerPlaceholder>
    </TouchableOpacity>
  );
};

export default React.memo(CategoryItem);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 40,
    borderRadius: 18,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
  },
});
