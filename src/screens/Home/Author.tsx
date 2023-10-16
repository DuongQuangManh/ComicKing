import {StyleSheet, View} from 'react-native';
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
const Author = () => {
  const {id} = useRoute<RouteProp<StackParamList, 'author'>>().params;
  const [data, setData] = useState<IAuthor>();
  const ref = useRef({
    skip: 0,
    limit: 0,
  }).current;
  const getData = async () => {
    let path = 'api/user/detailAuthor';
    const res = await sendRequest(path, {id});
    if (res.err === 200) {
      setData(res.data);
      ref.skip = res.data?.skip;
      ref.limit = res.data?.limit;
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Screen preset="scroll">
      <Header backgroundColor={myColors.transparent} text={data?.name} />
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
          <Text type="bold_22">{data?.name}</Text>
          <Text
            numberOfLines={1}
            style={{
              width: 180,
              marginTop: 10,
            }}>{`Giới thiệu: ${data?.description}`}</Text>
          <Text>{`Cập nhật lần cuối: ${data?.updatedComicAt}`}</Text>
        </View>
      </View>
      <View style={styles.box2}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.box2_1}>
            <Text type="bold_22">{data?.numOfFollow}</Text>
            <Text type="medium_14" color="#555454df">
              Người theo dõi
            </Text>
          </View>
          {/* <View style={styles.box2_1}>
          <Text>{data?.numOfFollow}</Text>
          <Text type="medium_12">Following</Text>
        </View> */}
          <View style={styles.box2_1}>
            <Text type="bold_22">{data?.numOfComic}</Text>
            <Text type="medium_14" color="#555454df">
              Truyện
            </Text>
          </View>
        </View>
        <Button text="Theo dõi" width={90} height={30} borderRadius={18} />
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
          data={data?.listComic}
          renderItem={({item}) => <ComicSmall item={item} />}
          estimatedItemSize={WINDOW_WIDTH}
          estimatedListSize={{
            width: WINDOW_WIDTH,
            height: WINDOW_HEIGHT / 2,
          }}
          numColumns={3}
          ListEmptyComponent={() => (
            <DataEmpty text="Tác giả chưa có bất kì tác phẩm nào" />
          )}
        />
      </View>
    </Screen>
  );
};

export default Author;

const styles = StyleSheet.create({
  box1: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT / 5 - 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  box1_1: {
    marginStart: 10,
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
