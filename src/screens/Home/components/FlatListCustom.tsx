import { StyleSheet, View, TouchableOpacity } from 'react-native';
import React, { FC } from 'react';
import { WINDOW_WIDTH, myColors } from '@utils';
import { Icon, Icons, Text } from '@components';
import FastImage from 'react-native-fast-image';
import { ComicSmall } from '@items';
import { FlashList } from '@shopify/flash-list';
interface componetProps {
  label?: string;
  isMore?: boolean;
  isItemLarge?: boolean;
  comicFirst?: any;
  horizontal?: boolean;
  data?: any;
}

const FlatListCustom: FC<componetProps> = ({
  isMore = false,
  isItemLarge = false,
  horizontal = true,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text type="bold_20">{props.label}</Text>
        {isMore && (
          <TouchableOpacity style={styles.box2}>
            <Text type="semibold_16">Thêm</Text>
            <Icon type={Icons.Entypo} name="chevron-right" size={16} />
          </TouchableOpacity>
        )}
      </View>
      {isItemLarge && (
        <View style={styles.box3}>
          <FastImage
            source={
              props.data[0].image
                ? { uri: props.data[0].image }
                : require('@assets/images/error_img.jpg')
            }
            defaultSource={require('@assets/images/error_img.jpg')}
            style={{
              width: (WINDOW_WIDTH * 2) / 5,
              height: WINDOW_WIDTH / 3 + 60,
              borderRadius: 18,
            }}
          />
          <View
            style={{
              flex: 1,
              paddingStart: 8,
              justifyContent: 'center',
            }}>
            <Text type="semibold_18" numberOfLines={2} ellipsizeMode="tail">
              {props.data[0].name}
            </Text>
            <Text
              type="medium_14"
              numberOfLines={5}
              ellipsizeMode="tail"
              style={{ color: '#4a4747d8' }}>
              {props.data[0].description}
            </Text>
          </View>
        </View>
      )}
      {props.data && props.data.length > 0 && (
        <FlashList
          estimatedItemSize={148}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={isItemLarge ? props.data.slice(1) : props.data}
          renderItem={({ item }) => <ComicSmall item={item} />}
          horizontal={horizontal}
          contentContainerStyle={{ paddingTop: 6, paddingRight: 8 }}
        />
      )}
    </View>
  );
};

export default React.memo(FlatListCustom);

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    marginTop: 18,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: 4
  },
  box2: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  box3: {
    padding: 5,
    flexDirection: 'row',
  },
});
