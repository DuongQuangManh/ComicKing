import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon, Icons, Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
import {IComic} from '@models';
import FastImage from 'react-native-fast-image';
import {navigate, push} from '@navigations';
import { useAppTheme } from '@hooks';

type ComponentProps = {
  listComic: IComic[];
  title: string;
  isMore?: boolean;
};

const ComicWithDescContainer: React.FC<ComponentProps> = ({
  listComic = [],
  title,
  isMore = false,
}) => {
  const theme = useAppTheme();
  const handlerSeeMore = () => {
    navigate('comicMore', {type: 'new'});
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        snapToInterval={280}>
        {listComic?.slice(0, 6)?.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              push('comicdetail', {id: item.id});
            }}
            style={styles.btnContainer}
            key={index}>
            <FastImage source={{uri: item.image}} style={styles.image} />
            <View style={styles.infoContainer}>
              <View style={{flex: 1}}>
                <Text numberOfLines={1} ellipsizeMode="tail" type="medium_12">
                  {item.name}
                </Text>
                <Text
                  type="light_12"
                  color={theme.textHint}
                  numberOfLines={4}
                  ellipsizeMode="tail">
                  {item.description}
                </Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginEnd: 8,
                  }}>
                  <Icon
                    name="eye"
                    type={Icons.Ionicons}
                    size={11}
                    color={theme.textHint}
                  />
                  <Text
                    style={{paddingStart: 1}}
                    color={theme.textHint}
                    type="light_12">
                    {item.numOfView ?? 0}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginEnd: 8,
                  }}>
                  <Icon
                    name="like1"
                    type={Icons.AntDesign}
                    size={11}
                    color={theme.textHint}
                  />
                  <Text
                    style={{paddingStart: 1}}
                    color={theme.textHint}
                    type="light_12">
                    {item.numOfLike ?? 0}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginEnd: 8,
                  }}>
                  <Icon
                    name="favorite"
                    type={Icons.MaterialIcons}
                    size={11}
                    color={theme.textHint}
                  />
                  <Text
                    style={{paddingStart: 1}}
                    color={theme.textHint}
                    type="light_12">
                    {item.numOfFollow ?? 0}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginEnd: 12,
                  }}>
                  <Icon
                    name="list"
                    type={Icons.Entypo}
                    size={11}
                    color={theme.textHint}
                  />
                  <Text
                    style={{paddingStart: 1}}
                    color={theme.textHint}
                    type="light_12">
                    {item.numOfChapter ?? 0}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ComicWithDescContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
    minHeight: 150,
  },
  btnContainer: {
    width: 280,
    marginTop: 8,
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: 8,
  },
  image: {
    width: 100,
    height: 100 * 1.47,
    borderRadius: 4,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
});
