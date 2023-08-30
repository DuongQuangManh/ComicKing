import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH} from '../utils';
import {Colors} from '../constants';
interface propsComponent {
  containerStyle?: any;
  width?: number;
  height?: number;
  onClick?: () => void;
  borderRadius?: number;
  textColor?: string;
  buttonColor?: string;
  text?: string;
  activeOpacity?: number;
  textSize?: number;
}
const Button: FC<propsComponent> = ({
  width = WINDOW_WIDTH - 50,
  height = 45,
  borderRadius = 22,
  buttonColor = Colors.BLACK_COLOR_CUSTOM,
  textColor = Colors.WHITE_COLOR,
  activeOpacity = 0.7,
  textSize = 16,
  containerStyle = {alignSelf: 'center'},
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[containerStyle]}
      onPress={props.onClick}
      activeOpacity={activeOpacity}>
      <View
        style={[
          styles.container,
          {
            width: width,
            height: height,
            borderRadius: borderRadius,
            backgroundColor: buttonColor,
          },
        ]}>
        <Text
          style={{
            color: textColor,
            fontSize: 16,
            fontWeight: '600',
          }}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
