import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {myColors} from '@utils';
interface propsItem {
  item?: any;
}
const ItemType: FC<propsItem> = ({item}) => {
  const handlerClick = () => {};
  const isSelect = item.name === 'All';
  return (
    <TouchableOpacity onPress={handlerClick}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        visible={true}
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
            {item.name}
          </Text>
        </View>
      </ShimmerPlaceholder>
    </TouchableOpacity>
  );
};

export default ItemType;

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
