import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {useAppDispatch} from '@redux/store';
import {setSelectComicId} from '@redux/homeSlice';
import {navigate} from '@navigations';
interface itemProps {
  item?: any;
}

const ComicItemSmall: FC<itemProps> = ({item}) => {
  const handlerClick = () => {
    navigate('comicdetail', {id: item.id});
  };
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={handlerClick}>
      <View style={styles.container}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          visible={true}
          width={WINDOW_WIDTH / 3 - 10}
          height={WINDOW_WIDTH / 3 + 60}
          style={{borderRadius: 18}}>
          <View style={styles.boximg}>
            <FastImage
              source={
                item.image
                  ? {uri: item.image}
                  : require('@assets/images/error_img.jpg')
              }
              defaultSource={require('@assets/images/error_img.jpg')}
              style={styles.img}
            />
          </View>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          visible={true}
          width={WINDOW_WIDTH / 3 - 10}
          style={{borderRadius: 18, marginTop: 5}}>
          <Text type="bold_16" numberOfLines={1} ellipsizeMode="tail">
            {item.name}
          </Text>
        </ShimmerPlaceholder>
      </View>
    </TouchableOpacity>
  );
};

export default ComicItemSmall;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH / 3,
    marginStart: 5,
    marginTop: 5,
  },
  boximg: {
    width: WINDOW_WIDTH / 3 - 9,
    height: WINDOW_WIDTH / 3 + 61,
    borderRadius: 18,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 15,
  },
  img: {
    width: WINDOW_WIDTH / 3 - 10,
    height: WINDOW_WIDTH / 3 + 60,
    borderRadius: 18,
  },
});
