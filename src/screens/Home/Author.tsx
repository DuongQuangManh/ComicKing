import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Screen} from '../screen';
import {Button, DataEmpty, Header, Text} from '@components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigations';
import {sendRequest} from '@api';
import {IAuthor} from '@models';
import FastImage from 'react-native-fast-image';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {FlashList} from '@shopify/flash-list';
import {ComicSmall} from '@items';
import {useAppSelector} from '@redux/store';
import { useAppTheme } from '@hooks';

const Author = () => {
  const {id} = useRoute<RouteProp<StackParamList, 'author'>>().params;
  const document = useAppSelector(state => state.userSlice.document);
  const [data, setData] = useState<IAuthor | any>();
  const [isFollow, setFollow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const theme = useAppTheme();
  const ref = useRef({
    skip: 0,
    limit: 0,
  }).current;
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const getData = async () => {
    let path = 'api/user/detailAuthor';
    const res = await sendRequest(path, {authorId: id, userId: document.id});
    setIsLoading(false);
    if (res.err === 200) {
      setFollow(res.data.isFollowing);
      setData(res.data);
      ref.skip = res.data?.skip;
      ref.limit = res.data?.limit;
    }
  };
  //api/user/toggleFollowAuthor
  const handlerFollow = async () => {
    if (isFollow) {
      setData((pre: any) => ({...pre, numOfFollow: pre.numOfFollow - 1}));
    } else {
      setData((pre: any) => ({...pre, numOfFollow: pre.numOfFollow + 1}));
    }
    setFollow(!isFollow);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => {
      let path = 'api/user/toggleFollowAuthor';
      const body = {
        userId: document.id,
        authorId: id,
        isFollow: !isFollow,
      };
      sendRequest(path, body);
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }, 1000);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Screen preset="fixed">
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color={myColors.primary}
          style={{height: WINDOW_HEIGHT * 0.9}}
        />
      ) : (
        <>
          <Header
            backgroundColor={myColors.transparent}
            text="Thông tin tác giả"
          />
          <View style={styles.box1}>
            <FastImage
              source={
                data?.image
                  ? {uri: data.image}
                  : require('@assets/images/avatar.png')
              }
              style={{width: 100, height: 100, borderRadius: 180}}
            />
            <View style={styles.box1_1}>
              <Text type="bold_18">{data?.name}</Text>
              <Text
                color={theme.textHint}
                type="light_13"
                numberOfLines={2}
                style={{
                  marginTop: 10,
                }}>{`Giới thiệu: ${data?.description}`}</Text>
              <Text
                color={theme.textHint}
                type="light_13">{`Cập nhật lần cuối: ${data?.updatedComicAt}`}</Text>
            </View>
          </View>
          <View style={styles.box2}>
            <View style={{flexDirection: 'row'}}>
              {/* <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigate('follow', {type: 'follower'})}> */}
              <View style={styles.box2_1}>
                <Text type="bold_22">{data?.numOfFollow}</Text>
                <Text type="medium_14" color="#555454df">
                  Người theo dõi
                </Text>
              </View>
              {/* </TouchableOpacity> */}

              <View style={styles.box2_1}>
                <Text type="bold_22">{data?.numOfComic}</Text>
                <Text type="medium_14" color="#555454df">
                  Truyện
                </Text>
              </View>
            </View>
            <Button
              onPress={handlerFollow}
              text={isFollow ? 'Đã theo dõi' : 'Theo dõi'}
              width={90}
              height={30}
              borderRadius={18}
              buttonColor={isFollow ? myColors.gray : myColors.primary}
            />
          </View>
          <View
            style={{
              width: WINDOW_WIDTH - 10,
              height: 1,
              alignSelf: 'center',
              backgroundColor: '#605e5e5f',
            }}
          />
          <View style={styles.box3}>
            <Text type="bold_24">Truyện</Text>
            <FlashList
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              data={data?.listComic}
              renderItem={({item}) => <ComicSmall item={item} />}
              estimatedItemSize={WINDOW_WIDTH}
              numColumns={3}
              ListEmptyComponent={() => (
                <DataEmpty text="Tác giả chưa có bất kì tác phẩm nào" />
              )}
            />
          </View>
        </>
      )}
    </Screen>
  );
};

export default Author;

const styles = StyleSheet.create({
  box1: {
    width: WINDOW_WIDTH,
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  box1_1: {
    marginStart: 10,
    flex: 1,
  },
  box2: {
    width: WINDOW_WIDTH,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  box2_1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: 10,
  },
  box3: {
    flex: 1,
    padding: 5,
  },
});
