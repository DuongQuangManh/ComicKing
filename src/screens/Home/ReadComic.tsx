import {
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  VirtualizedList,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Screen} from '../screen';
import {Header, Icon, Icons, Input} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {getChapterDetail, setDataChapter} from '@redux/chapterSlice';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList, goBack} from '@navigations';
import {FlashList} from '@shopify/flash-list';
import {ComicRead, PageChapter} from '@items';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {IChapterDetails} from '@models';
import {sendRequest} from '@api';
import {ActivityIndicator} from 'react-native-paper';
// api/user/detailChapter
const ReadComic = () => {
  const {id, chapter} =
    useRoute<RouteProp<StackParamList, 'readcomic'>>().params;
  const userId = useAppSelector(state => state.userSlice.document.id);
  const comic = useAppSelector(state => state.comicSlice.data);
  const flashlistRef = useRef<FlashList<any>>(null);
  const [cmt, setCmt] = useState('');
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(chapter);
  const [refreshing, setRefreshing] = useState(false);
  const [hasInitialData, setHasInitialData] = useState(false);
  const dispatch = useAppDispatch();
  const [data, setData] = useState<string[]>([]);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setIndex(pre => pre - 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const getData = async () => {
    let path = 'api/user/detailChapter';
    const res = await sendRequest(path, {
      userId: userId,
      comicId: comic.id,
      chapterIndex: index,
    });
    setLoading(false);
    setRefreshing(false);
    setHasInitialData(true);
    addNewComic(res.data);
  };

  const addNewComic = (newComic: IChapterDetails) => {
    setData(pre => {
      let updatedComic;
      if (pre.filter(item => !isNaN(Number(item))).length < 3) {
        const comic1 = [...pre, newComic.chapterIndex];

        updatedComic = comic1.concat(newComic.images);
      } else {
        const comic1 = [...pre.slice(pre.length), newComic.chapterIndex];
        updatedComic = comic1.concat(newComic.images);

        flashlistRef.current?.scrollToOffset({offset: 0, animated: true});
      }
      return updatedComic;
    });
  };

  useEffect(() => {
    getData();
  }, [index]);
  const handlerBack = () => {
    goBack();
    setData([]);
  };
  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{paddingVertical: 20}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return <View style={{height: 30}} />;
    }
  };
  const handlerLoadMore = () => {
    if (hasInitialData) {
      setLoading(true);
      setIndex(pre => pre + 1);
    }
  };
  return (
    <Screen>
      <Header
        backgroundColor={myColors.transparent}
        style={{position: 'absolute', top: 0, right: 0, left: 0, zIndex: 10}}
        text={`Chapter ${index}`}
        onBack={handlerBack}
      />
      <FlashList
        ref={flashlistRef}
        nestedScrollEnabled={true}
        estimatedItemSize={WINDOW_HEIGHT}
        estimatedListSize={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT}}
        data={data}
        renderItem={({item, index}) => (
          <PageChapter item={item} firstItem={index} />
        )}
        ListFooterComponent={renderFooter}
        onEndReached={() => handlerLoadMore()}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
