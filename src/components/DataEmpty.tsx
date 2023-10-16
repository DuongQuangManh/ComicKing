import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import Text from './Text';
interface componentProps {
  text?: string;
}
const DataEmpty: FC<componentProps> = ({text}) => {
  return (
    <View
      style={{
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text type="semibold_16" color={myColors.primary}>
        {text}
      </Text>
    </View>
  );
};

export default DataEmpty;

const styles = StyleSheet.create({});
