import React, { FC } from 'react';
import { WINDOW_WIDTH, myColors } from '../utils';
import { TextInput, TextInputProps } from 'react-native-paper'
import { ViewStyle, View, StyleProp, TouchableOpacity } from 'react-native';
import Icon, { Icons } from './Icon';
import { useAppTheme } from '@hooks';

interface propsComponent {
  width?: ViewStyle['width'],
  height?: ViewStyle['width'],
  color?: string,
  hintColor?: string,
  isRightIcon?: boolean,
  containerStyle?: StyleProp<ViewStyle>,
  onChangeShowPass?: (isHide: boolean) => void,
  isTrim?: boolean,
  value: string
}
type TInput = TextInputProps & propsComponent

const Input: FC<TInput> = ({
  width = WINDOW_WIDTH - 50,
  height = 45,
  isRightIcon,
  containerStyle,
  onChangeShowPass,
  isTrim = false,
  ...props
}) => {
  const theme = useAppTheme();
  return (
    <View style={containerStyle}>
      <TextInput
        {...props}
        onChangeText={val => props.onChangeText && props.onChangeText(isTrim ? val.trim() : val)}
        textColor={theme.text}
        placeholderTextColor={theme.text}
        style={[{ width: width, height: height, backgroundColor: theme.background }, props.style]}
      />
      {isRightIcon &&
        <TouchableOpacity
          onPress={() => {
            if (onChangeShowPass) onChangeShowPass(!props.secureTextEntry)
          }}
          style={{ position: 'absolute', right: 6, top: 26, zIndex: 10 }}>
          <Icon
            size={20}
            type={Icons.Ionicons}
            name={props.secureTextEntry ? 'eye-outline' : 'eye-off-outline'} />
        </TouchableOpacity>
      }
    </View>
  );
};

export default Input;
