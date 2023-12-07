import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {Header, Text} from '@components';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigations';
import moment from 'moment';

const NotificationDetail = () => {
  const {notification = {}} =
    useRoute<RouteProp<StackParamList, 'notificationDetail'>>().params || {};
  return (
    <Screen>
      <Header text="Thông báo" />
      <View style={{padding: 20}}>
        <Text type="semibold_22">{notification.title}</Text>
        <Text style={{marginTop: 20}}>{notification.content}</Text>
        <Text style={{marginTop: 5}}>
          {moment(notification.createdAt).format('HH:mm:ss / DD-MMMM-YYYY')}
        </Text>
      </View>
    </Screen>
  );
};

export default NotificationDetail;

const styles = StyleSheet.create({});
