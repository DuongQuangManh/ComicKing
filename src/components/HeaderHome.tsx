import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH, myColors} from '@utils';
import Icon, {Icons} from './Icon';
interface propsComponent {
  onClick?: () => void;
}
const HeaderHome: FC<propsComponent> = ({...props}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View style={styles.img}>
          <Image
            source={require('../assets/images/avatar.png')}
            style={{width: 50, height: 50, borderRadius: 180}}
          />
        </View>
        <View style={styles.name}>
          <Text
            style={{
              color: myColors.text,
              fontSize: 15,
              fontWeight: '400',
            }}>
            Good morning
          </Text>
          <Text
            style={{
              color: myColors.text,
              fontSize: 18,
              fontWeight: '600',
            }}>
            Dương Quang Mạnh
          </Text>
        </View>
        <View style={styles.btnMenu}>
          <TouchableOpacity onPress={props.onClick}>
            <Icon type={Icons.Ionicons} name="menu" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    backgroundColor: myColors.background,
  },
  box1: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  img: {
    width: 55,
    height: 55,
    borderRadius: 180,
    borderColor: myColors.background,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  btnMenu: {
    borderRadius: 180,
    width: 45,
    height: 45,
    borderWidth: 2,
    borderColor: myColors.inverseOnSurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    flex: 1,
    paddingStart: 10,
  },
});
