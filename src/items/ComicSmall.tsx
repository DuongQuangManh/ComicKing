import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React, { FC } from 'react';
import { Text } from '@components';
import { WINDOW_WIDTH, myColors } from '@utils';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { push } from '@navigations';
interface itemProps {
  item?: any;
}

const ComicItemSmall: FC<itemProps> = ({ item }) => {
  const handlerClick = () => {
    push('comicdetail', { id: item.id });
  };
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handlerClick}>
        <FastImage
          source={
            item.image
              ? { uri: item.image }
              : require('@assets/images/error_img.jpg')
          }
          resizeMode='cover'
          defaultSource={require('@assets/images/error_img.jpg')}
          style={styles.img}
        />
      <Text
        type="semibold_14"
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{ padding: 2, width: 145 }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ComicItemSmall);

const styles = StyleSheet.create({
  container: {
    width: 148,
    paddingStart: 8,
  },
  img: {
    width: 140,
    height: 190,
    borderRadius: 4,
  },
});
