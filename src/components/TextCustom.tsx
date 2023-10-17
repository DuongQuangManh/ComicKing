import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {myColors} from '@utils';
interface propsComponent {
  text?: any;
  width?: number;
  height?: number;
  borderRadius?: number;
  backgroundColor?: string;
  style?: any;
  onClick?: () => void;
  activeOpacity?: number;
}
const TextCustom: FC<propsComponent> = ({
  text,
  width = 80,
  height = 32,
  borderRadius = 18,
  backgroundColor = myColors.background,
  activeOpacity = 1,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={props.onClick}
      activeOpacity={activeOpacity}
      style={[props.style, {alignItems: 'center', justifyContent: 'center'}]}>
      <View
        style={[
          styles.containerTextCustom,
          {
            width: width,
            height: height,
            borderRadius: borderRadius,
            backgroundColor: backgroundColor,
          },
        ]}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TextCustom;

const styles = StyleSheet.create({
  containerTextCustom: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 30,
    minWidth: 100,
  },
  text: {
    fontWeight: '600',
    color: myColors.text,
  },
});
