import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
  BackHandler,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef, useCallback} from 'react';
import {Screen} from '../screen';
import {Header, Icon, Icons, Input, Text} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList, goBack, navigate} from '@navigations';
import {FlashList} from '@shopify/flash-list';
import {WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors, myTheme} from '@utils';
import {sendRequest} from '@api';
import {ActivityIndicator} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import {unshiftHistoryItem} from '@redux/homeSlice';

// api/user/detailChapter
const ReadComic = () => {
  const dispatch = useAppDispatch();
  const {id, name, image, numOfChapter, chapter, needLoadComic} =
    useRoute<RouteProp<StackParamList, 'readcomic'>>().params;
  const userId = useAppSelector(state => state.userSlice.document.id);
  const flashlistRef = useRef<FlashList<any>>(null);
  const [cmt, setCmt] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [isLike, setLike] = useState(false);

  const ref = useRef({
    initialChapter: chapter,
    currentChapter: -1,
    showingOption: true,
  }).current;

  const scrollY = useRef(new Animated.Value(1)).current;

  const onViewableItemsChanged = useRef(({viewableItems, changed}: any) => {
    const item = viewableItems?.[0]?.item;
    if (item && changed) {
      const type = typeof item;
      switch (type) {
        case 'number':
          ref.currentChapter = item;

          break;
        case 'object':
          if (item.chapterIndex) {
            ref.currentChapter = item.chapterIndex;
          }
          setLike(item.isLike);
          break;
      }
    }
  }).current;

  const getData = async (index: number) => {
    let path = 'api/user/detailChapter';
    setLoading(true);
    const res = await sendRequest(path, {
      userId: userId,
      comicId: id,
      chapterIndex: index,
    });
    setLoading(false);
    if (res.err == 200) {
      const newChapter = res.data;
      dispatch(
        unshiftHistoryItem({
          id,
          readingChapter: index,
          name,
          image,
          numOfChapter,
        }),
      );
      const endView = newChapter.hotCmt ?? {
        chapterIndex: newChapter.index,
        comments: [],
        isLike: newChapter.isLike,
      };
      ref.currentChapter = newChapter.index ?? 1;
      setLike(newChapter.isLike);

      setData(pre => [...pre, newChapter.index, ...newChapter.images, endView]);
    } else {
      helper.showErrorMsg(res.message);
    }
  };

  const handleBack = () => {
    goBack();
    if (needLoadComic) {
      navigate('comicdetail', {id});
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    getData(chapter);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{paddingVertical: 20}}>
          <ActivityIndicator color={myTheme.colors.primary} />
        </View>
      );
    } else {
      return <View style={{height: 30}} />;
    }
  };

  const handlerLoadMore = () => {
    //check initial loading
    if (loading || ref.currentChapter == -1) return;
    ref.currentChapter += 1;
    getData(ref.currentChapter);
  };

  const showOption = () => {
    if (!ref.showingOption) {
      ref.showingOption = true;
      Animated.timing(scrollY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const hideOption = () => {
    if (ref.showingOption) {
      ref.showingOption = false;
      Animated.timing(scrollY, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  const _renderItem = ({item, index}: any) => {
    let jsxItem = null;
    const type = typeof item;
    switch (type) {
      case 'string':
        jsxItem = (
          <Image
            key={index}
            source={
              item ? {uri: item} : require('@assets/images/error_img.jpg')
            }
            style={{
              width: WINDOW_WIDTH,
              height: WINDOW_WIDTH * 2,
              resizeMode: 'contain',
            }}
          />
        );
        break;
      case 'number':
        jsxItem = (
          <View
            style={{
              height: 200,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text type="bold_18">Chapter {item}</Text>
          </View>
        );
        break;
        // case 'object':
        jsxItem = (
          <View
            style={{backgroundColor: 'black', height: 600, width: '100%'}}
          />
        );
    }
    return jsxItem;
  };

  const handlerLike = async () => {
    let path = 'api/user/toggleLikeChapter';
    const obj = {
      userId: userId,
      chapterIndex: chapter,
      isLike: !isLike,
      comicId: id,
    };
    const res = await sendRequest(path, obj);
    if (res.err === 200) {
    }
    setLike(!isLike);
  };

  const handlerComment = async () => {
    let path = 'api/user/sendCommentInChapter';
    const body = {
      senderId: userId,
      content: cmt,
      chapterIndex: ref.currentChapter,
      comicId: id,
    };
    const res = await sendRequest(path, body);
    if (res.err === 200) {
    }
  };
  const handlerShowComment = () => {
    navigate('comments', {comicId: id, chapterIndex: ref.currentChapter});
  };
  return (
    <Screen unsafe translucent statusBarColor="transparent">
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          zIndex: 10,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -70],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <Header
          style={{height: 70}}
          backgroundColor={myColors.transparentGray}
          text={`Chapter ${ref.currentChapter}`}
          onBack={handleBack}
        />
      </Animated.View>
      {loading && ref.currentChapter == -1 ? (
        <ActivityIndicator
          style={{height: WINDOW_HEIGHT}}
          size="large"
          color={myTheme.colors.primary}
        />
      ) : (
        <FlashList
          ref={flashlistRef}
          onTouchMove={hideOption}
          onTouchEnd={showOption}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={WINDOW_HEIGHT}
          removeClippedSubviews={true}
          data={data}
          renderItem={_renderItem}
          ListFooterComponent={renderFooter}
          onEndReached={() => handlerLoadMore()}
          onEndReachedThreshold={1}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 60,
          }}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      )}

      <Animated.View
        style={[
          styles.bottomMenu,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 110],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}>
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
          <TouchableOpacity onPress={handlerComment}>
            <Icon type={Icons.Ionicons} name="send" />
          </TouchableOpacity>
        </View>
        <View style={[styles.boxbtn, {marginTop: 5}]}>
          <TouchableOpacity>
            <Icon type={Icons.Ionicons} name="chevron-back-outline" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlerLike}>
            <Icon type={Icons.AntDesign} name={isLike ? 'like1' : 'like2'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlerShowComment}>
            <Icon type={Icons.FontAwesome} name="comment-o" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon type={Icons.Ionicons} name="chevron-forward-outline" />
          </TouchableOpacity>
        </View>
      </Animated.View>
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
