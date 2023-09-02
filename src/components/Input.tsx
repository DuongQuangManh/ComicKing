import React, { FC } from 'react';
import { WINDOW_WIDTH } from '../utils';
import { TextInput, TextInputProps } from 'react-native-paper'

interface propsComponent {
  width?: number;
  height?: number;
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
      style={[{ width: width, height: height }, props.style]}
    />
  );
};

export default Input;
