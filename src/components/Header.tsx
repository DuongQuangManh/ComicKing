import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH} from '../utils';
import {Colors} from '../constants';
import Icon, {Icons} from './Icon';
interface propsComponent {
  text?: string;
  onBack?: () => void;
  onClickIconEnd?: () => void;
  isIconEnd?: boolean;
  nameIconEnd?: string;
  typeIconEnd?: any;
}
const Header: FC<propsComponent> = ({isIconEnd = false, ...props}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onBack}>
        <Icon name="chevron-back-outline" type={Icons.Ionicons} />
      </TouchableOpacity>
      <Text style={styles.text}>{props.text}</Text>
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
    justifyContent: 'space-between',
    padding: 10,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.BLACK_COLOR,
  },
});
