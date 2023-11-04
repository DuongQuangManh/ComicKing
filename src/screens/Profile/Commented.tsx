import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../screen';
import {DataEmpty, Header} from '@components';
import {FlashList} from '@shopify/flash-list';
import {sendRequest} from '@api';
import {useAppSelector} from '@redux/store';
import {Comment} from '@items';
import {WINDOW_HEIGHT, WINDOW_WIDTH} from '@utils';

const Commented = () => {
  const document = useAppSelector(state => state.userSlice.document);
  const [data, setData] = useState([]);
  const getData = async () => {
    let path = 'api/user/getListCommented';
    const res = await sendRequest(path, {userId: document.id});
    if (res.err === 200) {
      setData(res.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Screen>
      <Header text="Bình luận của tôi" />
      <FlashList
        data={data}
        renderItem={({item}) => <Comment item={item} />}
        estimatedItemSize={WINDOW_WIDTH}
        estimatedListSize={{width: WINDOW_WIDTH, height: WINDOW_HEIGHT / 4}}
        ListEmptyComponent={() => <DataEmpty text="Chưa có comment nào" />}
      />
    </Screen>
  );
};

export default Commented;

const styles = StyleSheet.create({});
