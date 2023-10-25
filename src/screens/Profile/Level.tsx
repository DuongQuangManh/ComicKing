import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {sendRequest} from '@api';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {Screen} from '../screen';
import {FlashList} from '@shopify/flash-list';
import LevelItem from './Components/LevelItem';
import {WINDOW_WIDTH, myColors} from '@utils';
import {Header, Text} from '@components';
import FastImage from 'react-native-fast-image';
import {getLevel} from '@redux/levelSlice';
import PrivilegeItem from './Components/PrivilegeItem';

const Level = () => {
  const document = useAppSelector(state => state.userSlice.document);
  const dispatch = useAppDispatch();
  const data: any = useAppSelector(state => state.levelSlice.data);
  const [currentIndex, setCurrentIndex] = useState(data.currentLevelIndex);
  useEffect(() => {
    dispatch(getLevel({id: document.id}));
  }, []);

  const handleViewableItemsChanged = useRef(({viewableItems, changed}: any) => {
    console.log(viewableItems[0]?.index + 1);
    const item = viewableItems?.[0];
    if (item && changed) {
      setCurrentIndex(item.index + 1);
    }
  }).current;
  return (
    <Screen backgroundColor={myColors.gray}>
      <Header text="Level của tôi" backgroundColor={myColors.gray} />
      <View style={styles.box1}>
        <FastImage
          source={
            document.image
              ? {uri: document.image}
              : require('@assets/images/error_img.jpg')
          }
          style={{width: 60, height: 60, borderRadius: 180}}
        />
        <View style={{justifyContent: 'center', marginStart: 10}}>
          <Text>{document.fullName}</Text>
          <View style={styles.lvlBtn}>
            <Text color="#fff" type="medium_14">
              {`Lv ${data?.currentLevelIndex}`}
            </Text>
          </View>
        </View>
      </View>
      <FlashList
        estimatedItemSize={WINDOW_WIDTH - 40}
        estimatedListSize={{
          width: WINDOW_WIDTH - 40,
          height: 180,
        }}
        data={data?.listLevel}
        renderItem={({item, index}) => (
          <LevelItem item={item} index={index + 1} />
        )}
        horizontal={true}
        contentContainerStyle={{paddingRight: 20}}
        snapToAlignment="start"
        decelerationRate={'fast'}
        snapToInterval={WINDOW_WIDTH - 20}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: WINDOW_WIDTH,
        }}
      />
      <View style={styles.box2}>
        <Text type="bold_18">{`Quyền lợi khi đạt level ${currentIndex}`}</Text>
        <FlashList
          estimatedItemSize={WINDOW_WIDTH - 40}
          estimatedListSize={{
            width: WINDOW_WIDTH - 40,
            height: 80,
          }}
          data={data?.listLevel[currentIndex - 1]?.listPrivilege}
          renderItem={({item}) => <PrivilegeItem item={item} />}
          numColumns={4}
        />
      </View>
    </Screen>
  );
};

export default Level;

const styles = StyleSheet.create({
  box1: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
    padding: 10,
  },
  lvlBtn: {
    backgroundColor: myColors.primary,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'baseline',
    elevation: 2,
    marginTop: 10,
  },
  box2: {
    width: WINDOW_WIDTH,
    flex: 1,
    padding: 10,
    backgroundColor: myColors.background,
    marginTop: 20,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
  },
});
