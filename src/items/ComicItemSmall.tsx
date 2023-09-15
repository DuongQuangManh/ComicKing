import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {FC} from 'react';
import {Text} from '@components';
import {WINDOW_WIDTH} from '@utils';
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
        <View style={styles.boximg}>
          <Image source={{uri: item.image}} style={styles.img} />
        </View>
        <Text
          type="semibold_16"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.txt}>
          {item.name}
        </Text>
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
  txt: {
    marginTop: 10,
  },
});
