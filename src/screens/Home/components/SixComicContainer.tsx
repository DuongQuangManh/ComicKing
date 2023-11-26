import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon, Icons, Text} from '@components';
import {WINDOW_WIDTH} from '@utils';
import {IComic} from '@models';
import FastImage from 'react-native-fast-image';
import {navigate, push} from '@navigations';

type ComponentProps = {
  listComic: IComic[];
  title: string;
  isMore?: boolean;
};

const WINDOW_WIDTH_33 = Math.round(WINDOW_WIDTH / 3);
const ITEM_WIDTH_33 = WINDOW_WIDTH_33 - 11;

const SixComicView: React.FC<ComponentProps> = ({
  listComic = [],
  title,
  isMore = false,
}) => {
  const handlerSeeMore = () => {
    navigate('comicMore', {type: 'hot'});
  };
  return (
    <View style={styles.container}>
      <View style={{width: WINDOW_WIDTH, flexDirection: 'row'}}>
        <Text type="semibold_17" style={{paddingHorizontal: 4, flex: 1}}>
          {title}
        </Text>
        {isMore && (
          <TouchableOpacity onPress={handlerSeeMore}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text type="bold_14">Thêm</Text>
              <Icon type={Icons.AntDesign} name="right" size={16} />
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.comicContainer}>
        {listComic.slice(0, 6)?.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              push('comicdetail', {id: item.id});
            }}
            style={{
              width: ITEM_WIDTH_33,
              marginTop: 8,
              alignItems: 'center',
              marginHorizontal: index % 2 == 0 ? 8 : 0,
            }}
            key={index}>
            <FastImage source={{uri: item.image}} style={styles.image} />
            <Text
              style={{width: '100%'}}
              numberOfLines={2}
              ellipsizeMode="tail"
              type="medium_12">
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default SixComicView;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
    minHeight: 300,
  },
  image: {
    width: ITEM_WIDTH_33,
    height: ITEM_WIDTH_33 * 1.47,
    borderRadius: 4,
  },
  comicContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
