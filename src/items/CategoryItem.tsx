import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {myColors} from '@utils';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {setSelect, setSelectBXH} from '@redux/categorySlice';
import {Text} from '@components';
interface propsItem {
  item?: any;
  isShowNumberComic?: boolean;
  isBXH?: boolean;
}
const CategoryItem: FC<propsItem> = ({
  item,
  isShowNumberComic = false,
  isBXH = false,
}) => {
  const dispatch = useAppDispatch();
  const handlerClick = () => {
    if (isBXH) {
      dispatch(setSelectBXH(item.id));
    } else {
      dispatch(setSelect(item.id));
    }
  };

  const loading = useAppSelector(state => state.categorySlice.loading);
  const select = isBXH
    ? useAppSelector(state => state.categorySlice.selectBXh)
    : useAppSelector(state => state.categorySlice.select);
  const isSelect = item.id === select;
  return (
    <TouchableOpacity onPress={handlerClick}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        visible={!loading}
        width={80}
        height={35}
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
          {isShowNumberComic ? (
            <Text
              type="semibold_12"
              style={[{color: isSelect ? myColors.background : undefined}]}>
              {`${item.title} ${
                item.numOfComic >= 0 ? `(${item.numOfComic})` : ''
              }`}
            </Text>
          ) : (
            <Text
              type="semibold_12"
              style={[{color: isSelect ? myColors.background : undefined}]}>
              {item.title}
            </Text>
          )}
        </View>
      </ShimmerPlaceholder>
    </TouchableOpacity>
  );
};

export default React.memo(CategoryItem);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 35,
    borderRadius: 18,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
