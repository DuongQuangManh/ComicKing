import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {IComic} from '@models';
import {Icon, Icons, Text} from '@components';
import {navigate, push} from '@navigations';
import FastImage from 'react-native-fast-image';
import {WINDOW_WIDTH, myColors} from '@utils';
import { useAppTheme } from '@hooks';

type ComponentProps = {
  listComic: IComic[];
  title: string;
  isMore?: boolean;
  visibleType?: 'left' | 'right';
};

const WINDOW_WIDTH_33 = Math.round(WINDOW_WIDTH / 3);
const ITEM_WIDTH_33 = WINDOW_WIDTH_33 - 11;

const FourComicContainer: React.FC<ComponentProps> = ({
  listComic = [],
  title,
  isMore = false,
  visibleType = 'right',
}) => {
  const theme = useAppTheme();
  const handlerSeeMore = () => {
    navigate('comicMore', {type: 'done'});
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
        {listComic[0] && (
          <TouchableOpacity
            onPress={() => {
              push('comicdetail', {id: listComic[0].id});
            }}
            activeOpacity={0.7}
            style={styles.firstItemBtn}>
            {visibleType == 'right' && (
              <>
                <FastImage
                  source={{uri: listComic[0].image}}
                  style={{
                    width: 160,
                    height: 200,
                    borderRadius: 8,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 12,
                    paddingVertical: 14,
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{width: '100%', marginBottom: 5}}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      type="medium_16">
                      {listComic[0].name}
                    </Text>
                    <Text
                      type="light_12"
                      numberOfLines={5}
                      ellipsizeMode="tail"
                      color={theme.textHint}>
                      {listComic[0].description}
                    </Text>
                  </View>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
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
                        {listComic[0].numOfView ?? 0}
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
                        {listComic[0].numOfLike ?? 0}
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
                        {listComic[0].numOfFollow ?? 0}
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
                        {listComic[0].numOfChapter ?? 0}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
            {visibleType == 'left' && (
              <>
                <View
                  style={{
                    flex: 1,
                    paddingHorizontal: 12,
                    paddingVertical: 14,
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text
                      style={{width: '100%', marginBottom: 5}}
                      numberOfLines={2}
                      ellipsizeMode="tail"
                      type="medium_16">
                      {listComic[0].name}
                    </Text>
                    <Text
                      type="light_12"
                      numberOfLines={5}
                      ellipsizeMode="tail"
                      color={theme.textHint}>
                      {listComic[0].description}
                    </Text>
                  </View>
                  <View
                    style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
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
                        color={myColors.textHint}
                      />
                      <Text
                        style={{paddingStart: 1}}
                        color={myColors.textHint}
                        type="light_12">
                        {listComic[0].numOfView ?? 0}
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
                        color={myColors.textHint}
                      />
                      <Text
                        style={{paddingStart: 1}}
                        color={myColors.textHint}
                        type="light_12">
                        {listComic[0].numOfLike ?? 0}
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
                        color={myColors.textHint}
                      />
                      <Text
                        style={{paddingStart: 1}}
                        color={myColors.textHint}
                        type="light_12">
                        {listComic[0].numOfFollow ?? 0}
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
                        color={myColors.textHint}
                      />
                      <Text
                        style={{paddingStart: 1}}
                        color={myColors.textHint}
                        type="light_12">
                        {listComic[0].numOfChapter ?? 0}
                      </Text>
                    </View>
                  </View>
                </View>
                <FastImage
                  source={{uri: listComic[0].image}}
                  style={{
                    width: 160,
                    height: 200,
                    borderRadius: 8,
                  }}
                />
              </>
            )}
          </TouchableOpacity>
        )}
        {listComic.slice(1, 4)?.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              push('comicdetail', {id: item.id});
            }}
            style={{
              width: ITEM_WIDTH_33,
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

export default FourComicContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 24,
    minHeight: 400,
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
  firstItemBtn: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
  },
});
