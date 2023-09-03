import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { WINDOW_WIDTH } from '../utils';
import { Icons } from './Icon';
import { Text, Icon } from '@components'
import { goBack } from '@navigations';
interface propsComponent {
  text: string;
  onBack?: () => void;
  onClickIconEnd?: () => void;
  isIconEnd?: boolean;
  nameIconEnd?: string;
  typeIconEnd?: any;
}
const Header: FC<propsComponent> = ({
  isIconEnd = false,
  onBack = goBack,
  ...props }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ position: 'absolute', zIndex: 10, left: 8 }} onPress={onBack}>
        <Icon name="chevron-back-outline" type={Icons.Ionicons} size={22} />
      </TouchableOpacity>
      <Text style={{ flex: 1, textAlign: 'center' }} type='semibold_18' >{props.text}</Text>
      {isIconEnd ? (
        <TouchableOpacity onPress={props.onClickIconEnd}>
          <Icon name={props.nameIconEnd} type={props.typeIconEnd} />
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
    flexDirection: 'row',
    padding: 10,
  },
});
