import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Icons, Text} from '@components';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {helper, myColors} from '@utils';

type ComponentProps = {
  name: string;
  rank: number;
  image: string;
  author: string;
  description: string;
  type: 'hot' | 'level' | 'purchase';
  numOfView?: number;
  level?: number;
  onPress: (type: 'hot' | 'level' | 'purchase') => void;
};

const ComicRankItem: React.FC<ComponentProps> = ({
  name,
  rank,
  image,
  author,
  description,
  type,
  numOfView = 0,
  onPress,
}) => {
  const _renderType = useMemo(() => {
    switch (type) {
      case 'hot':
      default:
        return (
          <View style={styles.typeContainer}>
            <Icon
              name="fire"
              type={Icons.MaterialCommunityIcons}
              size={12}
              color={myColors.textHint}
            />
            <Text style={{color: myColors.textHint}} type="regular_12">
              {helper.convertToK(numOfView)}
            </Text>
          </View>
        );
    }
  }, []);

  const _renderRank = useMemo(() => {
    let imgSource = null;
    switch (rank) {
      case 1:
        imgSource = require('@assets/icons/top1.png');
        break;
      case 2:
        imgSource = require('@assets/icons/top2.png');
        break;
      case 3:
        imgSource = require('@assets/icons/top3.png');
        break;
    }
    if (!imgSource) {
      return (
        <View style={styles.rankContainer}>
          <View style={styles.circleRank}>
            <Text
              type="semibold_14"
              color={myColors.textHint}>{`${rank}`}</Text>
          </View>
          {_renderType}
        </View>
      );
    }
    return (
      <View style={styles.rankContainer}>
        <FastImage source={imgSource} style={{width: 20, height: 20}} />
        {_renderType}
      </View>
    );
  }, []);

  return (
    <TouchableOpacity
      onPress={() => onPress(type)}
      style={{flexDirection: 'row', paddingVertical: 6}}>
      <FastImage
        style={{width: 80, height: 115, borderRadius: 3}}
        source={{uri: image}}
      />
      <View style={styles.infoContainer}>
        <View style={{flex: 1}}>
          <Text type="medium_16">{name}</Text>
          <Text type="regular_12" numberOfLines={2} ellipsizeMode="tail">
            {description}
          </Text>
        </View>
        <Text type="regular_12" color={myColors.textHint}>
          {author}
        </Text>
      </View>
      {_renderRank}
    </TouchableOpacity>
  );
};

export default ComicRankItem;

const styles = StyleSheet.create({
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleRank: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: myColors.gray,
    borderRadius: 10,
  },
  infoContainer: {
    paddingVertical: 12,
    flex: 1,
    paddingStart: 15,
    paddingEnd: 20,
    height: '100%',
  },
  rankContainer: {
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'flex-end',
  },
});
