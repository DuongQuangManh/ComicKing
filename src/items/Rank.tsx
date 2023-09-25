import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {Icon, Icons, Text} from '@components';
const top1 = require('@assets/icons/top1.png');
const top2 = require('@assets/icons/top2.png');
const top3 = require('@assets/icons/top3.png');
interface itemProps {
  item?: any;
  index: number;
}
const RankItem: FC<itemProps> = ({item, index}) => {
  return (
    <ShimmerPlaceholder
      LinearGradient={LinearGradient}
      visible={true}
      style={[styles.container, {marginTop: 10, borderRadius: 18}]}>
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.box1}>
            {index === 1 && (
              <Image source={top1} style={{width: 26, height: 26}} />
            )}
            {index === 2 && (
              <Image source={top2} style={{width: 26, height: 26}} />
            )}
            {index === 3 && (
              <Image source={top3} style={{width: 26, height: 26}} />
            )}
            {index >= 4 && <Text type="semibold_16">{index}</Text>}
          </View>
          <View style={styles.box2}>
            <Image
              source={{uri: item.image}}
              style={{flex: 1, borderRadius: 18}}
            />
            <View style={styles.box3}>
              <Text type="semibold_16" numberOfLines={1} ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text
                type="semibold_14"
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{marginTop: 10}}>
                {item.type}
              </Text>
              <View style={styles.box4}>
                <Icon type={Icons.Ionicons} name="eye-outline" size={16} />
                <Text type="medium_14" style={{marginStart: 5}}>
                  {helper.convertToK(item.view)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </ShimmerPlaceholder>
  );
};

export default RankItem;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH - 10,
    flexDirection: 'row',
    height: 100,
  },
  box1: {
    width: ((WINDOW_WIDTH - 10) * 1) / 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box2: {
    width: ((WINDOW_WIDTH - 10) * 6) / 7,
    flexDirection: 'row',
    paddingStart: 5,
  },
  box3: {
    flex: 3,
    padding: 5,
  },
  box4: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingEnd: 3,
    paddingBottom: 3,
  },
});
