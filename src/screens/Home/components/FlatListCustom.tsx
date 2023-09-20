import {
  StyleSheet,
  View,
  FlatList,
  FlatListProps,
  TouchableOpacity,
} from 'react-native';
import React, {FC} from 'react';
import {Screen} from '../../screen';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {Icon, Icons, Text} from '@components';
import FastImage from 'react-native-fast-image';
import {useAppSelector} from '@redux/store';
import {ComicItemSmall} from '@items';
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
              source={{uri: props.data[0].image}}
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
        <FlatList
          nestedScrollEnabled={true}
          style={styles.flat}
          ListFooterComponent={() => <View style={{height: 5}} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={isItemLarge ? props.data.slice(1) : props.data}
          renderItem={({item}) => <ComicItemSmall item={item} />}
          horizontal={horizontal}
        />
      </View>
    </Screen>
  );
};

export default FlatListCustom;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    padding: 5,
    marginTop: 5,
  },
  flat: {
    marginTop: 10,
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
