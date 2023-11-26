import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {Screen} from '../../screen';
import {WINDOW_HEIGHT, WINDOW_WIDTH, bxh, myColors} from '@utils';
import {Icon, Icons, Text} from '@components';
import {Category} from '@items';
// import {comicData} from '../Home';
import {Rank} from '@items';
import LinearGradient from 'react-native-linear-gradient';
import {FlashList} from '@shopify/flash-list';

const LeaderBoard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <View style={styles.box2}>
          <Text type="bold_24">BXH Hot</Text>
          <Image
            source={require('@assets/icons/fire.png')}
            style={styles.iconHot}
          />
          <Image
            source={require('@assets/icons/fire.png')}
            style={styles.iconHot}
          />
        </View>
        <TouchableOpacity style={styles.box3}>
          <Text type="semibold_16">Thêm</Text>
          <Icon type={Icons.Entypo} name="chevron-right" size={16} />
        </TouchableOpacity>
      </View>
      <View style={styles.type}>
        <FlashList
          estimatedItemSize={40}
          estimatedListSize={{
            height: 40,
            width: WINDOW_WIDTH,
          }}
          nestedScrollEnabled={true}
          data={bxh}
          renderItem={({item}) => <Category item={item} isBXH={true} />}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <FlashList
        nestedScrollEnabled={true}
        data={[]}
        renderItem={({item, index}) => <Rank item={item} index={index + 1} />}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={WINDOW_HEIGHT}
        estimatedListSize={{
          height: WINDOW_HEIGHT,
          width: WINDOW_WIDTH,
        }}
      />
      <LinearGradient
        style={styles.box4}
        colors={['rgba(255, 255, 255, 0.227)', 'white']}>
        <TouchableOpacity style={{alignSelf: 'center', marginTop: 10}}>
          <View style={styles.box5}>
            <Text type="semibold_14">See more</Text>
            <Icon type={Icons.Entypo} name="chevron-down" size={14} />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default LeaderBoard;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    padding: 5,
    marginTop: 5,
    paddingBottom: 20,
  },
  iconHot: {
    width: 26,
    height: 26,
    marginStart: 3,
  },
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box2: {
    flexDirection: 'row',
  },
  box3: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    marginTop: 10,
  },
  box4: {
    height: 130,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  box5: {
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: myColors.transparentGray,
    borderRadius: 28,
  },
});
