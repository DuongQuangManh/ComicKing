import {StyleSheet, View, TouchableOpacity, useColorScheme} from 'react-native';
import React, {FC, useState, useEffect} from 'react';
import {WINDOW_WIDTH} from '../utils';
import {Icons} from './Icon';
import {Text, Icon} from '@components';
import {goBack} from '@navigations';
import { useAppTheme } from '@hooks';
interface propsComponent {
  text?: string;
  onBack?: () => void;
  onClickIconEnd?: () => void;
  isIconEnd?: boolean;
  nameIconEnd?: string;
  typeIconEnd?: any;
  backgroundColor?: string;
  style?: any;
  color?: string
}
const Header: FC<propsComponent> = ({
  isIconEnd = false,
  onBack = goBack,
  backgroundColor,
  color,
  ...props
}) => {
  const theme = useAppTheme()
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: backgroundColor || theme.background },
        props.style,
      ]}>
      <TouchableOpacity
        style={{position: 'absolute', zIndex: 10, left: 8}}
        onPress={onBack}>
        <Icon color={theme.transparentWhite} name="chevron-back-outline" type={Icons.Ionicons} size={22} />
      </TouchableOpacity>
      <Text style={{flex: 1, textAlign: 'center'}} color={color || theme.text} type="bold_18">
        {props.text}
      </Text>
      {isIconEnd ? (
        <TouchableOpacity
          onPress={props.onClickIconEnd}
          style={{alignSelf: 'center', position: 'absolute', right: 12}}>
          <Icon color={color} name={props.nameIconEnd} type={props.typeIconEnd} size={22} />
        </TouchableOpacity>
      ) : (
        <View />
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
});
