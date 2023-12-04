import {StyleSheet, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {Screen} from '../screen';
import {Header} from '@components';
import {FlashList} from '@shopify/flash-list';
import {Notification} from '@items';
import {WINDOW_WIDTH} from '@utils';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {
  getListNotification,
  resetCountNewNotification,
} from '@redux/notificationSlice';

const Notifications = () => {
  const dispatch = useAppDispatch();
  const {id} = useAppSelector(state => state.userSlice.document || {});
  const {listNotification} = useAppSelector(state => state.notificationSlice);

  useEffect(() => {
    dispatch(getListNotification({userId: id}));
    dispatch(resetCountNewNotification({userId: id}));
  }, []);

  console.log(listNotification);

  return (
    <Screen>
      <Header text="Thông báo" />
      {/* <FlashList
        data={data}
        renderItem={({item}) => <Notification item={item} />}
        estimatedItemSize={WINDOW_WIDTH}
        estimatedListSize={{
          width: WINDOW_WIDTH,
          height: 50,
        }}
      /> */}
      <FlatList
        data={listNotification}
        renderItem={({item}) => <Notification item={item} />}
      />
    </Screen>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
