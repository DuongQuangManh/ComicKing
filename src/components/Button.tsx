import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React, { FC } from 'react';
import { KeyFontType, WINDOW_WIDTH, myColors } from '../utils';
import { Text } from '@components'
interface propsComponent {
  width?: number;
  height?: number;
  borderRadius?: number;
  textColor?: string;
  buttonColor?: string;
  text?: string;
  textType?: KeyFontType;
}
type TButton = propsComponent & TouchableOpacityProps

const Button: FC<TButton> = ({
  width = WINDOW_WIDTH - 50,
  height = 45,
  borderRadius = 22,
  buttonColor = myColors.primary,
  textColor = myColors.background,
  textType = 'medium_15',
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[{
        borderRadius,
        backgroundColor: buttonColor,
        width, height,
        alignItems: 'center',
        justifyContent: 'center'
      },
      props.style]}>
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
  },
});
