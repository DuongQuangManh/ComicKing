import { StyleSheet, TouchableOpacity, StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';
import React, { FC } from 'react';
import { KeyFontType, WINDOW_WIDTH, myColors } from '../utils';
import { Text } from '@components'

interface propsComponent {
  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  borderRadius?: number;
  textColor?: string;
  buttonColor?: string;
  text: string;
  textType?: KeyFontType;
  disable?: boolean
}
type TButton = propsComponent & TouchableOpacityProps

const Button: FC<TButton> = ({
  width = WINDOW_WIDTH - 50,
  height = 45,
  borderRadius = 3,
  buttonColor = myColors.primary,
  textColor = myColors.background,
  textType = 'regular_15',
  disable = false,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disable}
      style={[
        styles.container,
        props.style,
        {
          borderRadius,
          backgroundColor: disable ? myColors.disablePrimary : buttonColor,
          width, height,
        },
      ]}>
      <Text type={textType} color={textColor}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2
  },
});
