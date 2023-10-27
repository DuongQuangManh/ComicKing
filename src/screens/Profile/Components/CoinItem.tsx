import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
interface componentProps {
  image?: any;
  title?: string;
  description?: string;
  price?: string;
}
const CoinItem: FC<componentProps> = ({image, title, description, price}) => {
  return (
    <TouchableOpacity style={styles.itemCoin}>
      <FastImage
        source={image}
        style={{width: 50, height: 50}}
        resizeMode="center"
      />
      <View style={{flex: 1, paddingStart: 10}}>
        <Text type="bold_18">{title}</Text>
        <Text type="regular_14" color="#ff0000">
          {description}
        </Text>
      </View>
      <Text type="semibold_16" color="#ff0000">
        {`${price} ₫`}
      </Text>
    </TouchableOpacity>
  );
};

export default CoinItem;

const styles = StyleSheet.create({
  itemCoin: {
    width: WINDOW_WIDTH - 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: myColors.gray,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: myColors.background,
  },
});
