import React, { FC } from 'react';
import { WINDOW_WIDTH, myColors } from '../utils';
import { TextInput, TextInputProps } from 'react-native-paper'
import { ViewStyle } from 'react-native';

interface propsComponent {
  width?: ViewStyle['width'],
  height?: ViewStyle['width'],
  color?: string,
  hintColor?: string
}
type TInput = TextInputProps & propsComponent

const Input: FC<TInput> = ({
  width = WINDOW_WIDTH - 50,
  height = 45,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      textColor={myColors.text}
      placeholderTextColor={myColors.textHint}
      style={[{ width: width, height: height }, props.style]}
    />
  );
};

export default Input;
