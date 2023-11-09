import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {Header} from '@components';
import {FlashList} from '@shopify/flash-list';
import {Notification} from '@items';
import {WINDOW_WIDTH} from '@utils';

const Notifications = () => {
  const data = [
    {
      id: 1,
      fullname: 'Dương Quang Mạnh',
      content: 'Đã nhắc đến bạn trong một comment',
      image:
        'https://ecdn.game4v.com/g4v-content/uploads/2020/08/Dragon-Ball-Ban-Nang-Vo-Cuc-1-game4v.png',
      isSee: false,
    },
    {
      id: 2,
      fullname: 'Lê Gia Tuấn',
      content: 'Vừa đăng tải truyện mới',
      isSee: false,
      image:
        'https://file.hstatic.net/200000695275/file/nguoi-manh-nhat-vu-tru-dragon-ball__4__5c436553964444f6aefdb9d28330f48c.jpg',
    },
    {
      id: 3,
      fullname: 'Lê Gia Tuấn',
      content: 'Aaaaa đã có thêm chapter mới',
      isSee: false,
      image:
        'https://file.hstatic.net/200000695275/file/nguoi-manh-nhat-vu-tru-dragon-ball__4__5c436553964444f6aefdb9d28330f48c.jpg',
    },
    {
      id: 4,
      fullname: 'Hệ Thống',
      content: 'Thẻ vip của bạn sắp hết hạn',
      isSee: false,
      image:
        'https://www.pushengage.com/wp-content/uploads/2022/10/How-to-Add-a-Push-Notification-Icon.png',
    },
    {
      id: 5,
      fullname: 'Lê Gia Tuấn',
      content: 'Vừa đăng tải truyện mới',
      isSee: false,
      image:
        'https://file.hstatic.net/200000695275/file/nguoi-manh-nhat-vu-tru-dragon-ball__4__5c436553964444f6aefdb9d28330f48c.jpg',
    },
    {
      id: 6,
      fullname: 'Lê Gia Tuấn',
      content: 'Aaaaa đã có thêm chapter mới',
      isSee: false,
      image:
        'https://file.hstatic.net/200000695275/file/nguoi-manh-nhat-vu-tru-dragon-ball__4__5c436553964444f6aefdb9d28330f48c.jpg',
    },
    {
      id: 7,
      fullname: 'Hệ Thống',
      content: 'Thẻ vip của bạn sắp hết hạn',
      isSee: false,
      image:
        'https://www.pushengage.com/wp-content/uploads/2022/10/How-to-Add-a-Push-Notification-Icon.png',
    },
  ];
  return (
    <Screen>
      <Header text="Thông báo" />
      <FlashList
        data={data}
        renderItem={({item}) => <Notification item={item} />}
        estimatedItemSize={WINDOW_WIDTH}
        estimatedListSize={{
          width: WINDOW_WIDTH,
          height: 50,
        }}
      />
    </Screen>
  );
};

export default Notifications;

const styles = StyleSheet.create({});
