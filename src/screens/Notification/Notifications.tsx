import {StyleSheet, FlatList, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../screen';
import {Header, Text} from '@components';
import {Notification} from '@items';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {
  getListNotification,
  resetCountNewNotification,
} from '@redux/notificationSlice';
import {myColors} from '@utils';

const Notifications = () => {
  const dispatch = useAppDispatch();
  const {id} = useAppSelector(state => state.userSlice.document || {});
  const [tag, setTag] = useState('system');
  const {listNotification} = useAppSelector(state => state.notificationSlice);

  useEffect(() => {
    if (tag) {
      dispatch(getListNotification({userId: id, tag}));
    }
  }, [tag]);

  useEffect(() => {
    dispatch(resetCountNewNotification({userId: id}));
  }, []);

  return (
    <Screen>
      <Header text="Thông báo" />
      <View style={{flexDirection: 'row', paddingBottom: 10}}>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 6,
            backgroundColor: tag == 'system' ? myColors.primary : 'white',
          }}
          onPress={() => {
            if (tag != 'system') setTag('system');
          }}>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 30,
            }}>
            Hệ Thống
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 6,
            backgroundColor: tag == 'transaction' ? myColors.primary : 'white',
          }}
          onPress={() => {
            if (tag != 'transaction') setTag('transaction');
          }}>
          <Text
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 30,
            }}>
            Giao Dịch
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listNotification}
        renderItem={({item}) => <Notification item={item} />}
      />
    </Screen>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
