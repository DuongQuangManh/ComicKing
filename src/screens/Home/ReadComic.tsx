import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../screen';
import {Header, Icon, Icons, Input} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {getChapterDetail} from '@redux/chapterSlice';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigations';
import {FlashList} from '@shopify/flash-list';
import {PageChapter} from '@items';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {IChapterDetails} from '@models';
// api/user/detailChapter
const ReadComic = () => {
  const {id, chapter} =
    useRoute<RouteProp<StackParamList, 'readcomic'>>().params;
  const userId = useAppSelector(state => state.userSlice.document.id);
  const data = useAppSelector(state => state.chapterSlice.data);
  const [cmt, setCmt] = useState('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getChapterDetail({userId: userId, chapterId: id}));
  }, []);
  return (
    <Screen>
      <Header
        backgroundColor={myColors.transparent}
        style={{position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10}}
        text={`Chapter ${chapter}`}
      />
      <FlashList
        nestedScrollEnabled={true}
        estimatedItemSize={WINDOW_HEIGHT}
        estimatedListSize={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT}}
        data={data?.images}
        renderItem={({item}) => <PageChapter item={item} />}
      />
      <View style={styles.bottomMenu}>
        <View style={styles.boxbtn}>
          <Input
            value={cmt}
            onChangeText={setCmt}
            style={{
              width: (WINDOW_WIDTH * 6) / 7,
              height: 35,
              backgroundColor: myColors.transparentGray,
              borderRadius: 8,
              color: myColors.surfaceVariant,
            }}
          />
          <TouchableOpacity>
            <Icon type={Icons.Ionicons} name="send" />
          </TouchableOpacity>
        </View>
        <View style={[styles.boxbtn, {marginTop: 5}]}>
          <TouchableOpacity>
            <Icon type={Icons.Ionicons} name="chevron-back-outline" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon type={Icons.AntDesign} name="like1" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon type={Icons.Ionicons} name="chevron-forward-outline" />
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
};

export default ReadComic;

const styles = StyleSheet.create({
  bottomMenu: {
    width: WINDOW_WIDTH,
    backgroundColor: myColors.transparentGray,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 10,
    padding: 5,
  },
  boxbtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
});
