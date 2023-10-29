import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Text} from '@components';
import LinearGradient from 'react-native-linear-gradient';
import {WINDOW_WIDTH, myColors} from '@utils';

type ItemProps = {
  title: string;
  numOfComic: number;
  onPress: () => void;
};

const ITEM_WIDTH = WINDOW_WIDTH / 2;

const CategoryItem: React.FC<ItemProps> = ({title, numOfComic, onPress}) => {
  return (
    <LinearGradient
      colors={[myColors.primary_80, myColors.primary_60]}
      style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.btn}>
        <Text type="medium_17">{title}</Text>
        <View style={styles.circleContainer}>
          <Text
            type="semibold_16"
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{maxHeight: '80%'}}>
            {numOfComic}
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    height: 75,
    borderRadius: 5,
    width: ITEM_WIDTH - 10,
    marginStart: 5,
    marginTop: 10,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    justifyContent: 'space-between',
  },
  circleContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
