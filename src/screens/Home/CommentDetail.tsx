import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {WINDOW_HEIGHT, WINDOW_WIDTH, myColors} from '@utils';
import {StackParamList, goBack} from '@navigations';
import {
  RouteProp,
  StackNavigationState,
  useRoute,
} from '@react-navigation/native';
import {
  AvatarFrame,
  DataEmpty,
  Header,
  Icon,
  IconText,
  Icons,
  Input,
  Text,
} from '@components';
import {sendRequest} from '@api';
import {FlashList} from '@shopify/flash-list';
import {Comment} from '@items';
import {ActivityIndicator} from 'react-native-paper';
import {useAppSelector} from '@redux/store';

const CommentDetail = () => {
  const {item} = useRoute<RouteProp<StackParamList, 'commentdetail'>>().params;
  const user = useAppSelector(state => state.userSlice.document);
  const [like, setLike] = useState<number>(item?.numOfLike);
  const [isLike, setIsLike] = useState(item?.isLike);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [cmt, setCmt] = useState('');

  const getData = async () => {
    let path = 'api/user/comment/getListComment';
    const body = {
      userId: item?.sender,
      commentId: item?.id,
      comicId: item.comic,
    };
    setLoading(true);
    const res = await sendRequest(path, body);
    if (res.err === 200) {
      setData(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handlerLikeComment = async () => {
    let path = 'api/user/toggleLikeComment';
    const body = {
      userId: item?.sender,
      commentId: item?.id,
      comicId: '653a1787f6ed060033d6b3af', //item?.comicId,
      isLike: !isLike,
    };
    const res = await sendRequest(path, body);
    if (res.err === 200) {
      if (isLike) {
        setLike(pre => pre - 1);
      } else {
        setLike(pre => pre + 1);
      }
    }
    setIsLike(!isLike);
  };
  const handlerSendCmt = async () => {
    let path = 'api/user/sendCommentInComment';
    const body = {
      senderId: user?.id,
      content: cmt,
      commentId: item?.id,
    };
    const res = await sendRequest(path, body);
    if (res.err === 200) {
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
        {loading === true ? (
          <ActivityIndicator
            size="large"
            color={myColors.primary}
            style={{height: WINDOW_HEIGHT * 0.9}}
          />
        ) : (
          <>
            <View style={{width: WINDOW_WIDTH, minHeight: 230}}>
              <View style={styles.box1}>
                <AvatarFrame
                  image={item?.senderInfo?.image}
                  frame={item?.senderInfo?.avatarFrame}
                  width={70}
                  height={70}
                />
                <View
                  style={{
                    marginStart: 10,
                    justifyContent: 'center',
                  }}>
                  <Text type="bold_18">{item?.senderInfo?.fullName}</Text>
                  <TouchableOpacity style={styles.lvlBtn}>
                    <Text color="#fff" type="medium_14">
                      {`Lv ${item?.senderInfo?.level}`}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.box2}>
                <Text type="semibold_16" style={{flex: 1}}>
                  {item.content}
                </Text>

                <View style={styles.box2_1}>
                  <Text style={{flex: 1}}>
                    {item?.time ? item.time : '15:36 27/10/2023'}
                  </Text>
                  <View
                    style={[
                      styles.box1,
                      {justifyContent: 'space-between', padding: 5},
                    ]}>
                    <View
                      style={{
                        width: 1,
                        backgroundColor: myColors.text,
                        marginEnd: 10,
                      }}
                    />
                    <TouchableOpacity onPress={handlerLikeComment}>
                      <IconText
                        nameIcon="like1"
                        typeIcon={Icons.AntDesign}
                        text={like + ''}
                        sizeIcon={16}
                        colorText={isLike ? myColors.primary : myColors.text}
                        colorIcon={isLike ? myColors.primary : myColors.text}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                width: WINDOW_WIDTH - 10,
                height: 3,
                borderWidth: 1,
                borderColor: myColors.text,
                alignSelf: 'center',
              }}
            />
            <View style={{padding: 10, flex: 1}}>
              <Text type="bold_18">Các câu trả lời</Text>

              <FlashList
                data={data ?? []}
                renderItem={({item}) => <Comment item={item} />}
                estimatedItemSize={WINDOW_WIDTH}
                estimatedListSize={{
                  width: WINDOW_WIDTH,
                  height: (WINDOW_HEIGHT * 2) / 3,
                }}
                contentContainerStyle={{paddingBottom: 70}}
                ListEmptyComponent={() => (
                  <DataEmpty text="Chưa có câu trả lời nào" />
                )}
              />
            </View>
          </>
        )}
        <View style={styles.box3}>
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
      </View>
    </Modal>
  );
};

export default CommentDetail;

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
    flexDirection: 'row',
  },
  lvlBtn: {
    backgroundColor: myColors.primary,
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignSelf: 'baseline',
    elevation: 2,
    marginTop: 10,
  },
  box2: {
    flex: 1,
    padding: 10,
  },
  box2_1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box3: {
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
