import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Icon, Icons, Text} from '@components';
import {WINDOW_WIDTH, myColors} from '@utils';
import {IComic} from '@models';
import FastImage from 'react-native-fast-image';
import {push} from '@navigations';

type ComponentProps = {
  listComic: IComic[];
  title: string;
};

const ComicWithDescContainer: React.FC<ComponentProps> = ({
  listComic = [],
  title,
}) => {
  return (
    <View style={styles.container}>
      <Text type="semibold_17" style={{paddingHorizontal: 4}}>
        {title}
      </Text>
      <ScrollView horizontal pagingEnabled snapToInterval={280}>
        {listComic.slice(0, 6)?.map((item, index) => (
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
                  color={myColors.textHint}
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
                    color={myColors.textHint}
                  />
                  <Text
                    style={{paddingStart: 1}}
                    color={myColors.textHint}
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
                    color={myColors.textHint}
                  />
                  <Text
                    style={{paddingStart: 1}}
                    color={myColors.textHint}
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
                    name="favorite"
                    type={Icons.MaterialIcons}
                    size={11}
                    color={myColors.textHint}
                  />
                  <Text
                    style={{paddingStart: 1}}
                    color={myColors.textHint}
                    type="light_12">
                    {item.numOfFavorite ?? 0}
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
                    {item.numOfView ?? 0}
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
    marginTop: 16,
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
