import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH, myColors} from '@utils';
import Icon, {Icons} from '../../../components/Icon';
import Text from '../../../components/Text';
import {useAppSelector} from '@redux/store';
import FastImage from 'react-native-fast-image';
interface propsComponent {
  onClick?: () => void;
}

const HeaderHome: FC<propsComponent> = ({...props}) => {
  const {fullName, image} = useAppSelector(state => state.userSlice.document);

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View style={styles.img}>
          <FastImage
            source={image ? {uri: image} : require('@assets/images/avatar.png')}
            style={{width: 50, height: 50, borderRadius: 25}}
            defaultSource={require('@assets/images/error_img.jpg')}
          />
        </View>
        <View style={styles.name}>
          <Text
            type="semibold_16"
            style={{
              color: myColors.text,
              fontSize: 15,
              fontWeight: '600',
            }}>
            Good morning
          </Text>
          <Text
            style={{
              color: myColors.text,
              fontSize: 18,
              fontWeight: '800',
            }}>
            {fullName}
          </Text>
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
    borderRadius: 30,
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
    alignItems: 'center',
    justifyContent: 'center',
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
