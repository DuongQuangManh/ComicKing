import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '../constants';
import {WINDOW_WIDTH} from '../utils';
interface propsComponent {
  containerStyle?: any;
  width?: number;
  height?: number;
  placeholder?: string;
  extraProps?: TextInputProps;
}
const Input: FC<propsComponent> = ({
  width = WINDOW_WIDTH - 50,
  height = 45,
  extraProps,
  containerStyle = {alignSelf: 'center'},
  ...props
}) => {
  return (
    <TextInput
      placeholder={props.placeholder}
      style={[styles.input, {width: width, height: height}, containerStyle]}
      {...extraProps}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.BLACK_COLOR,
    paddingStart: 10,
  },
});
