import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {Screen} from '../../screen';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {Icon, Icons, Text} from '@components';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '@redux/store';
import {ComicSmall} from '@items';
import {FlashList} from '@shopify/flash-list';
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
    <Screen>
      <View style={styles.container}>
        <View style={styles.box1}>
          <Text type="bold_24">{props.label}</Text>
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
                  ? {uri: props.data[0].image}
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
                style={{color: '#4a4747d8'}}>
                {props.data[0].description}
              </Text>
            </View>
          </View>
        )}
        <View style={styles.flat}>
          {props.data && props.data.length > 0 && (
            <FlashList
              estimatedItemSize={WINDOW_WIDTH / 3 + 60}
              estimatedListSize={{
                height: WINDOW_WIDTH / 3 + 60,
                width: WINDOW_WIDTH,
              }}
              nestedScrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={isItemLarge ? props.data.slice(1) : props.data}
              renderItem={({item}) => <ComicSmall item={item} />}
              horizontal={horizontal}
              contentContainerStyle={{paddingTop: 10, paddingRight: 10}}
            />
          )}
        </View>
      </View>
    </Screen>
  );
};

export default FlatListCustom;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    minHeight: 10,
    padding: 5,
    marginTop: 5,
  },
  flat: {
    flex: 1,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
