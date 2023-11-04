import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon, Icons, Text} from '@components';
import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {helper, myColors} from '@utils';

type ComponentProps = {
  name: string;
  rank: number;
  image: string;
  type: 'hot' | 'level' | 'purchase';
  level?: number;
  onPress: (type: 'hot' | 'level' | 'purchase') => void;
  avatarFrame: string;
  avatarTitle: string;
};

const UserRankItem: React.FC<ComponentProps> = ({
  name,
  rank,
  image,
  type,
  onPress,
  avatarFrame,
  avatarTitle,
}) => {
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
        </View>
      );
    }
    return (
      <View style={styles.rankContainer}>
        <FastImage source={imgSource} style={{width: 20, height: 20}} />
      </View>
    );
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onPress(type)}
      style={{
        flexDirection: 'row',
        paddingStart: 10,
        borderBottomWidth: 1,
        borderColor: myColors.gray,
        marginTop: 15,
        paddingVertical: 15,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          style={{width: 70, height: 70, borderRadius: 35}}
          source={{uri: image}}
        />
        <FastImage
          source={{uri: avatarFrame}}
          style={{width: 85, height: 85, position: 'absolute'}}
        />
      </View>
      <View style={{paddingStart: 30, flex: 1}}>
        <Text numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <View style={styles.lvlBtn}>
          <Text color="#fff" type="regular_10">
            Lv1
          </Text>
        </View>
      </View>
      {_renderRank}
      <FastImage
        resizeMode="contain"
        style={{
          width: 90,
          height: 35,
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}
        source={{uri: avatarTitle}}
      />
    </TouchableOpacity>
  );
};

export default UserRankItem;

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
  lvlBtn: {
    backgroundColor: myColors.primary,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'baseline',
    elevation: 2,
    marginTop: 4,
  },
});
