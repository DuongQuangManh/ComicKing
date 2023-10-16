import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
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
import {StackParamList, navigate} from '@navigations';
import {useAppDispatch, useAppSelector} from '@redux/store';
import FastImage from 'react-native-fast-image';
import {WINDOW_HEIGHT, WINDOW_WIDTH, helper, myColors} from '@utils';
import LinearGradient from 'react-native-linear-gradient';
import ButtonInteract from './components/ButtonInteract';
import IconText from '../../components/IconText';
import {FlashList} from '@shopify/flash-list';
import {Chapter, ComicSmall, CommentTop} from '@items';
import HeaderDetail from './components/HeaderDetail';
import Interact from './components/Interact';
import {detailComic} from '@redux/comicSlice';
import {CateModel} from '@models';

const ComicDetail = () => {
  const {id} = useRoute<RouteProp<StackParamList, 'comicdetail'>>().params;
  const user = useAppSelector(state => state.userSlice.document);
  const dispatch = useAppDispatch();
  const propose = useAppSelector(state => state.homeSlice.proposeComics);
  const comic = useAppSelector(state => state.comicSlice.data);
  const [screen, setScreen] = useState(1);
  const changeScreen = (number: number) => {
    if (number != screen) {
      setScreen(number);
    }
  };
  const listCate = [
    {
      id: 1,
      name: 'Hành động',
    },
    {
      id: 2,
      name: 'Mạo hiểm',
    },
    {
      id: 3,
      name: 'Viễn tưởng',
    },
    {
      id: 4,
      name: 'Hentai',
    },
    {
      id: 5,
      name: 'Anime',
    },
    {
      id: 6,
      name: 'Dragon',
    },
  ];
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

  useEffect(() => {
    console.log(id);
    console.log(user.id);
    dispatch(detailComic({comicId: id, userId: user.id}));
  }, []);

  const handlerShowModalComment = () => {
    navigate('comment');
  };

  const handlerReadComic = () => {
    if (comic.readingChapter) {
      navigate('readcomic', {id: comic.id, chapter: comic.readingChapter});
    } else {
      navigate('readcomic', {id: comic.id, chapter: 1});
    }
  };
  const handlerShowAuthor = () => {
    navigate('author', {id: comic.author.id});
  };
  return (
    <Screen>
      <Header
        backgroundColor={myColors.transparent}
        style={{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10}}
      />
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.box2}>
          <HeaderDetail />
          <Interact />
          <View style={styles.box3}>
            <ButtonInteract
              label="Chi tiết"
              isClick={screen === 1}
              isIcon={false}
              typeText="semibold_16"
              onClick={() => changeScreen(1)}
            />
            <ButtonInteract
              label="Chương"
              isClick={screen === 2}
              isIcon={false}
              typeText="semibold_16"
              onClick={() => changeScreen(2)}
            />
          </View>
          {screen === 1 ? (
            <View style={[styles.box2]}>
              <View style={{padding: 5}}>
                <TextMore text={comic.description} />
                <FlashList
                  data={comic.categories as CateModel[]}
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
              <Button
                text={
                  comic.readingChapter
                    ? `Tiếp tục đọc chapter ${comic.readingChapter}`
                    : 'Bắt đầu đọc'
                }
                borderRadius={25}
                style={{marginTop: 20, alignSelf: 'center'}}
                onPress={handlerReadComic}
              />
              <View style={[styles.box3, styles.author]}>
                <FastImage
                  source={
                    comic.author.image
                      ? {uri: comic.author.image}
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
                  <Text type="semibold_16">{comic.author.name}</Text>
                  <Text type="regular_15">{`${helper.convertToK(
                    comic.author.numOfFollow,
                  )} Fan`}</Text>
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
                    <Icon type={Icons.Entypo} name="chevron-right" size={16} />
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
                  {`Cập nhật đến chap ${comic.chapters.length}`}
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
                data={comic.chapters}
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
      </ScrollView>
    </Screen>
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
});
