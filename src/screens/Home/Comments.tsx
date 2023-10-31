import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Modal from 'react-native-modal';
import {StackParamList, goBack} from '@navigations';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Header, Icon, Icons, Input, Text} from '@components';
import {FlashList} from '@shopify/flash-list';
import {Comment} from '@items';
import {sendRequest} from '@api';
import {useAppSelector} from '@redux/store';
import {TouchableOpacity} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

const Comments = () => {
  const {comicId} = useRoute<RouteProp<StackParamList, 'comments'>>().params;
  const {document, avatarFrame} = useAppSelector(state => state.userSlice);
  const level = useAppSelector(state => state.levelSlice);
  const [data, setData] = useState<any[]>([]);
  const [cmt, setCmt] = useState('');
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    let path = 'api/user/comic/getListComment';
    const body = {
      userId: document.id,
      comicId: comicId,
    };
    const res = await sendRequest(path, body);
    if (res.err === 200) {
      setData(res.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const handlerSendCmt = async () => {
    let path = 'api/user/sendCommentInComic';
    const body = {
      senderId: document.id,
      content: cmt,
      comicId: comicId,
    };
    const myCmt = {
      createdAt: 'now',
      senderInfo: {
        avatarFrame: avatarFrame?.image,
        level: level.data.currentLevelIndex,
        fullName: document.fullName,
        image: document.image,
      },
      content: cmt,
      numOfLike: 0,
      numOfComment: 0,
      sender: document.id,
    };
    const res = await sendRequest(path, body);
    if (res.err === 200) {
      setData(pre => [...pre, myCmt]);
    }
  };
  return (
    <Modal
      isVisible
      animationIn={'slideInUp'}
      backdropOpacity={0.4}
      onBackdropPress={goBack}
      style={{
        width: WINDOW_WIDTH,
        height: WINDOW_HEIGHT,
        justifyContent: 'flex-end',
        alignSelf: 'center',
        backgroundColor: myColors.transparent,
      }}>
      <View style={styles.container}>
        <Header text="Bình luận" />
        {loading ? (
          <ActivityIndicator
            size="large"
            color={myColors.primary}
            style={{height: WINDOW_HEIGHT * 0.9}}
          />
        ) : (
          <>
            <Text>{`Tổng ${data?.length} comment`}</Text>
            <FlashList
              data={data}
              renderItem={({item}) => <Comment item={item} />}
              estimatedItemSize={WINDOW_WIDTH}
              estimatedListSize={{
                width: WINDOW_WIDTH,
                height: (WINDOW_HEIGHT * 2) / 3,
              }}
              contentContainerStyle={{paddingBottom: 70}}
            />
            <View style={styles.box1}>
              <Input
                value={cmt}
                onChangeText={setCmt}
                placeholder="Nhập bình luận của bạn"
                placeholderTextColor={myColors.text}
                style={{
                  width: (WINDOW_WIDTH * 6) / 7,
                  height: 35,
                  backgroundColor: myColors.transparentGray,
                  borderRadius: 8,
                  color: myColors.surfaceVariant,
                }}
              />
              <TouchableOpacity onPress={handlerSendCmt}>
                <Icon type={Icons.Ionicons} name="send" />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};

export default Comments;

const styles = StyleSheet.create({
  container: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT - 100,
    backgroundColor: myColors.surfaceVariant,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    bottom: -20,
  },
  box1: {
    width: WINDOW_WIDTH,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    padding: 10,
    backgroundColor: myColors.background,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
