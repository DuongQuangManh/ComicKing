import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH, myColors} from '../utils';
import {Icons} from './Icon';
import {Text, Icon} from '@components';
import {goBack} from '@navigations';
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
  backgroundColor = myColors.background,
  color = myColors.text,
  ...props
}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: backgroundColor},
        props.style,
      ]}>
      <TouchableOpacity
        style={{position: 'absolute', zIndex: 10, left: 8}}
        onPress={onBack}>
        <Icon color={color} name="chevron-back-outline" type={Icons.Ionicons} size={22} />
      </TouchableOpacity>
      <Text style={{flex: 1, textAlign: 'center'}} color={color} type="bold_18">
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
