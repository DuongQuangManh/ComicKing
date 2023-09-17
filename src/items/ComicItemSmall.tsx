import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
interface itemProps {
  item?: any;
}
// id: 1,
// name: 'Cuộc phiêu lưu của biệt đội vô cực ',
// description:'đây là biệt đội vô cực chuyên đi xử lí xác sống ngoài vũ trụ'
// image:
//   'https://dccomicsnews.com/wp-content/uploads/2022/07/I-Am-Batman-11-2-Banner.jpg',
// chapter: 330,
// time: '2 ngày trước',
// type: 'Manga',
const ComicItemSmall: FC<itemProps> = ({item}) => {
  return (
    <TouchableOpacity activeOpacity={0.8}>
      <View style={styles.container}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          visible={true}
          width={WINDOW_WIDTH / 3 - 10}
          height={WINDOW_WIDTH / 3 + 60}
          style={{borderRadius: 18}}>
          <View style={styles.boximg}>
            <Image source={{uri: item.image}} style={styles.img} />
          </View>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          visible={true}
          width={WINDOW_WIDTH / 3 - 10}
          style={{borderRadius: 18, marginTop: 10}}>
          <Text type="semibold_16" numberOfLines={1} ellipsizeMode="tail">
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
