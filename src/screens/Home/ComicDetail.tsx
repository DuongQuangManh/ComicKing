import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../screen';
import {
  Button,
  DataEmpty,
  Header,
  Icon,
  Icons,
  Text,
  TextCustom,
  TextMore,
} from '@components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList, navigate, push} from '@navigations';
import {useAppSelector} from '@redux/store';
import FastImage from 'react-native-fast-image';
import {WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors} from '@utils';
import {FlashList} from '@shopify/flash-list';
import {Chapter, ComicSmall, CommentTop} from '@items';
import HeaderDetail from './components/HeaderDetail';
import Interact from './components/Interact';
import {CateModel, IComicDetails} from '@models';
import {ActivityIndicator} from 'react-native-paper';
import {sendRequest} from '@api';

const ComicDetail = () => {
  const {id} = useRoute<RouteProp<StackParamList, 'comicdetail'>>().params;
  const user = useAppSelector(state => state.userSlice.document);
  const propose = useAppSelector(state => state.homeSlice.proposeComics);
  const [detailComic, setDetailComic] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const [screen, setScreen] = useState(1);
  const changeScreen = (number: number) => {
    if (number != screen) {
      setScreen(number);
    }
  };
  const listCm = [
    {
      id: 1,
      image:
        'https://facts.net/wp-content/uploads/2023/08/25-facts-about-ultra-instinct-goku-dragon-ball-super-1692311277.jpg',
      name: 'Le Gia Tuan',
      comment: 'Truyện như hay',
      time: '24/09/2023 11:02',
    },
    {
      id: 2,
      image:
        'https://facts.net/wp-content/uploads/2023/08/25-facts-about-ultra-instinct-goku-dragon-ball-super-1692311277.jpg',
      name: 'Le Gia Tuan',
      comment: 'Truyện như hay',
      time: '24/09/2023 11:02',
    },
    {
      id: 3,
      image:
        'https://facts.net/wp-content/uploads/2023/08/25-facts-about-ultra-instinct-goku-dragon-ball-super-1692311277.jpg',
      name: 'Le Gia Tuan',
      comment: 'Truyện như hay',
      time: '24/09/2023 11:02',
    },
    {
      id: 4,
      image:
        'https://facts.net/wp-content/uploads/2023/08/25-facts-about-ultra-instinct-goku-dragon-ball-super-1692311277.jpg',
      name: 'Le Gia Tuan',
      comment: 'Truyện như hay',
      time: '24/09/2023 11:02',
    },
  ];

  const getDetailData = async () => {
    let path = 'api/user/detailComic';
    try {
      setLoading(true);
      const res = await sendRequest(path, {comicId: id, userId: user?.id});
      setLoading(false);
      if (res.err == 200) {
        setDetailComic(res.data ?? {});
      } else {
        helper.showErrorMsg(res.message);
      }
    } catch (error: any) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // dispatch(detailComic({comicId: id, userId: user.id}));
    getDetailData();
  }, []);

  const handlerShowModalComment = () => {
    navigate('comment');
  };

  const handlerReadComic = () => {
    if (detailComic.readingChapter) {
      navigate('readcomic', {
        id: detailComic.id,
        chapter: detailComic.readingChapter,
      });
    } else {
      if (detailComic.numOfChapter > 0)
        navigate('readcomic', {id: detailComic.id, chapter: 1});
    }
  };
  const handlerShowAuthor = () => {
    push('author', {id: detailComic.author?.id});
  };
  return (
    <>
      <Header
        backgroundColor={myColors.transparent}
        style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10}}
      />
      <Screen preset="scroll" nestedScrollEnabled>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={myColors.primary}
            style={{height: WINDOW_HEIGHT * 0.9}}
          />
        ) : (
          <View style={styles.box2}>
            <HeaderDetail
              image={detailComic.image}
              view={detailComic.numOfView}
              like={detailComic.numOfLike}
              name={detailComic.name}
              star={5}
            />

            <View style={[styles.box3, {padding: 10}]}>
              <Button
                text="Chi tiết"
                onPress={() => changeScreen(1)}
                textColor={
                  screen === 1 ? myColors.background : myColors.primary
                }
                buttonColor={
                  screen === 1 ? myColors.primary : myColors.background
                }
                style={{flex: 1}}
                borderRadius={40}
                height={35}
              />
              <Button
                text="Chương"
                onPress={() => changeScreen(2)}
                textColor={
                  screen === 2 ? myColors.background : myColors.primary
                }
                buttonColor={
                  screen === 2 ? myColors.primary : myColors.background
                }
                style={{flex: 1, marginStart: 10}}
                borderRadius={40}
                height={35}
              />
            </View>
            {screen === 1 ? (
              <View style={[styles.box2]}>
                <View style={{padding: 5}}>
                  <Interact
                    comicId={detailComic.id}
                    isFollowing={detailComic.isFollowing}
                  />
                  <View style={styles.containerDes}>
                    <TextMore text={detailComic.description} />
                    <FlashList
                      data={(detailComic.categories as CateModel[]) ?? []}
                      nestedScrollEnabled={true}
                      estimatedItemSize={100}
                      estimatedListSize={{
                        width: WINDOW_WIDTH,
                        height: 40,
                      }}
                      contentContainerStyle={{paddingTop: 5}}
                      renderItem={({item}) => (
                        <TextCustom
                          text={item?.title}
                          style={{
                            borderWidth: 1,
                            borderColor: myColors.gray,
                            borderRadius: 18,
                            marginStart: 5,
                            minWidth: 100,
                          }}
                        />
                      )}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                    />
                  </View>
                </View>
                <Button
                  text={
                    detailComic.readingChapter
                      ? `Tiếp tục đọc chapter ${detailComic.readingChapter}`
                      : 'Bắt đầu đọc'
                  }
                  borderRadius={25}
                  style={{marginTop: 20, alignSelf: 'center'}}
                  onPress={handlerReadComic}
                />
                <View style={[styles.box3, styles.author]}>
                  <FastImage
                    source={
                      detailComic.author?.image
                        ? {uri: detailComic.author?.image}
                        : require('@assets/images/avatar.png')
                    }
                    style={{
                      width: 60,
                      height: 60,
                      borderWidth: 1,
                      borderColor: myColors.background,
                      borderRadius: 180,
                    }}
                  />
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text type="semibold_16">{detailComic.author?.name}</Text>
                    <Text type="regular_15">
                      {detailComic.author?.numOfFollow
                        ? `${helper.convertToK(
                            detailComic.author?.numOfFollow,
                          )} Fan`
                        : ''}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={handlerShowAuthor}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text type="semibold_14" style={{color: '#555555'}}>
                      Xem tác giả
                    </Text>
                    <Icon type={Icons.Entypo} name="chevron-right" size={16} />
                  </TouchableOpacity>
                </View>
                <View style={styles.box4}>
                  <View
                    style={{
                      justifyContent: 'space-between',
                      width: WINDOW_WIDTH - 10,
                      flexDirection: 'row',
                    }}>
                    <Text type="bold_18">Bình luận nổi bật</Text>

                    <TouchableOpacity
                      onPress={handlerShowModalComment}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text type="semibold_14" style={{color: '#555555'}}>
                        Tổng 138.3k bình luận
                      </Text>
                      <Icon
                        type={Icons.Entypo}
                        name="chevron-right"
                        size={16}
                      />
                    </TouchableOpacity>
                  </View>
                  <FlashList
                    data={listCm}
                    renderItem={({item}) => <CommentTop item={item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    estimatedItemSize={290}
                    estimatedListSize={{
                      width: WINDOW_WIDTH,
                      height: 290,
                    }}
                    contentContainerStyle={{paddingTop: 10, paddingRight: 10}}
                    snapToAlignment="start"
                    decelerationRate={'fast'}
                    snapToInterval={WINDOW_WIDTH - 20}
                  />
                </View>
                <View style={{flex: 1, height: 500, marginTop: 10}}>
                  <View
                    style={[
                      styles.box3,
                      {justifyContent: 'space-between', padding: 5},
                    ]}>
                    <Text type="bold_18">Đề xuất liên quan</Text>
                    <TouchableOpacity>
                      <Icon
                        type={Icons.Fontisto}
                        name="spinner-refresh"
                        size={18}
                      />
                    </TouchableOpacity>
                  </View>
                  <FlashList
                    data={propose}
                    renderItem={({item}) => <ComicSmall item={item} />}
                    numColumns={3}
                    showsVerticalScrollIndicator={false}
                    estimatedItemSize={WINDOW_WIDTH / 3 + 60}
                    estimatedListSize={{
                      width: WINDOW_WIDTH,
                      height: WINDOW_WIDTH / 3 + 60,
                    }}
                  />
                </View>
              </View>
            ) : (
              <View style={[styles.box2]}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 5,
                  }}>
                  <Text type="bold_16" style={{flex: 1}}>
                    {`Cập nhật đến chap ${detailComic.chapters?.length}`}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity>
                      <Text type="bold_16" color={myColors.primary}>
                        Mới
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginStart: 10}}>
                      <Text type="bold_16">Cũ</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <FlashList
                  nestedScrollEnabled={true}
                  data={detailComic.chapters ?? []}
                  renderItem={({item}) => <Chapter item={item} />}
                  estimatedItemSize={100}
                  estimatedListSize={{
                    width: WINDOW_WIDTH,
                    height: 100,
                  }}
                  ListEmptyComponent={() => (
                    <DataEmpty text="Các chương chưa được cập nhật" />
                  )}
                />
              </View>
            )}
          </View>
        )}
      </Screen>
    </>
  );
};

export default ComicDetail;

const styles = StyleSheet.create({
  box1: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT / 3 / 3,
    justifyContent: 'center',
    paddingStart: 10,
  },
  box2: {
    flex: 1,
  },
  box3: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
  },
  box4: {
    width: WINDOW_WIDTH,
    marginTop: 20,
    padding: 5,
    backgroundColor: myColors.surfaceVariant,
    borderWidth: 1,
    borderColor: myColors.gray,
  },
  author: {
    marginTop: 10,
  },
  containerDes: {
    width: WINDOW_WIDTH - 20,
    backgroundColor: myColors.gray,
    borderRadius: 12,
    padding: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
});
