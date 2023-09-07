import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {WINDOW_WIDTH, myColors} from '@utils';
import {Icon, Icons, TextCustom} from '@components';
interface propsItem {
  item?: any;
}
const ItemComic: FC<propsItem> = ({item}) => {
  const handlerClick = () => {};
  return (
    <TouchableOpacity onPress={handlerClick} activeOpacity={0.7}>
      <View style={styles.container}>
        <ImageBackground
          source={{uri: item.image}}
          style={styles.image}
          borderRadius={18}>
          <TextCustom
            text={'Chapter: ' + item.chapter}
            width={120}
            style={{position: 'absolute', top: 10, end: 10}}
          />
          <TextCustom
            text={item.type}
            width={100}
            style={{position: 'absolute', start: 10, bottom: 10}}
          />
        </ImageBackground>
        <View style={styles.bottom}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              styles.text,
              {fontSize: 16, maxWidth: ((WINDOW_WIDTH - 30) * 7) / 10},
            ]}>
            {item.name}
          </Text>
          <View style={styles.time}>
            <Icon type={Icons.Ionicons} name="time-outline" size={20} />
            <Text style={[styles.text, {marginStart: 5}]}>{item.time}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemComic;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH - 20,
    height: 250,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: WINDOW_WIDTH - 30,
    height: 200,
  },
  bottom: {
    width: WINDOW_WIDTH - 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  time: {
    flexDirection: 'row',
    maxWidth: ((WINDOW_WIDTH - 30) * 3) / 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    color: myColors.text,
  },
});
