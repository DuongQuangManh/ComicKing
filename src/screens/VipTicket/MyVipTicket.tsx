import {Image, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Screen} from '../screen';
import {Button, Header, Text} from '@components';
import {useAppSelector} from '@redux/store';
import {helper, myColors} from '@utils';
import {sendRequest} from '@api';
import {Decorate} from '@models';
import {goBack, navigate} from '@navigations';

const MyVipTicket = () => {
  const {ticket} = useAppSelector(state => state.userSlice.wallet || {});
  const {coinExtraDaily, expExtraDaily, expiredAt, vipTicket} = ticket || {};
  const {duration, id: vipTicketId} = vipTicket || {};
  const [time, setTime] = useState({
    leftDay: 0,
    leftHour: 0,
    isExpired: false,
  });
  const [listAvatarFrame, setListAvatarFrame] = useState<Decorate[]>([]);
  const [listAvatarTitle, setListAvatarTitle] = useState<Decorate[]>([]);

  useEffect(() => {
    if (duration && expiredAt) {
      let leftTimeStamp = expiredAt - Date.now();
      if (leftTimeStamp < 0) {
        setTime(pre => ({
          ...pre,
          isExpired: true,
        }));
      } else {
        let timeStampOneDay = 24 * 60 * 60 * 1000;
        let timeStampOneHour = 60 * 60 * 1000;
        const leftDay = Math.floor(leftTimeStamp / timeStampOneDay);
        setTime(pre => ({
          ...pre,
          leftDay,
          leftHour: Math.ceil(
            (leftTimeStamp - timeStampOneDay * leftDay) / timeStampOneHour,
          ),
        }));
      }
    }
  }, [duration, expiredAt]);

  const getDetailData = async (vipTicketId: string) => {
    helper.showLoading();
    try {
      const respone = await sendRequest('api/user/detailVipTicket', {
        vipTicketId,
      });
      helper.hideLoading();

      if (respone.err == 200) {
        setListAvatarFrame(respone.data?.listAvatarFrame || []);
        setListAvatarTitle(respone.data?.listAvatarTitle || []);
      } else {
        helper.showErrorMsg(respone.message);
      }
    } catch (error) {
      helper.showLoading();
      console.log('Error : ', error);
    }
  };

  useEffect(() => {
    if (vipTicketId) {
      getDetailData(vipTicketId);
    }
  }, [vipTicketId]);

  return (
    <Screen>
      <Header text="Thẻ của tôi" />
      <View style={{paddingHorizontal: 20}}>
        {time.isExpired ? (
          <View style={{alignItems: 'center', marginTop: 200}}>
            <Text type="semibold_18" style={{marginVertical: 30}}>
              Thẻ của bạn đã hết hạn
            </Text>
            <Button
              text="Mua thẻ tháng"
              onPress={() => {
                goBack();
                navigate('listVipTicket');
              }}
            />
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginVertical: 20,
              }}>
              <Text type="semibold_20" color={myColors.primary}>
                {ticket?.vipTicket?.name}
              </Text>
              <View style={{alignItems: 'center'}}>
                <Text color={myColors.primary}>Còn lại</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>{time.leftDay} ngày </Text>
                  <Text> {time.leftHour} giờ</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop: 20}}>
              <Text type="semibold_16">Đặc quyền: </Text>

              <View style={{paddingHorizontal: 20}}>
                <Text style={{marginTop: 20}}>Điểm danh ngày : </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: 10,
                  }}>
                  <Text type="semibold_16">+ {coinExtraDaily} xu</Text>
                  <Text type="semibold_16">+ {expExtraDaily} exp</Text>
                </View>
                <Text style={{marginTop: 20}}>Mở khóa khung avatar : </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    marginTop: 20,
                  }}>
                  {listAvatarFrame.map((item, index) => (
                    <View key={index}>
                      <Image
                        source={{uri: item.image}}
                        style={{width: 120, height: 120}}
                      />
                    </View>
                  ))}
                </View>
                <Text style={{marginTop: 20}}>Mở khóa danh hiệu : </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    marginTop: 20,
                  }}>
                  {listAvatarTitle.map((item, index) => (
                    <View key={index}>
                      <Image
                        resizeMode="contain"
                        source={{uri: item.image}}
                        style={{width: 140, height: 60}}
                      />
                    </View>
                  ))}
                </View>
              </View>
            </View>
            <Text
              type="regular_15"
              style={{marginTop: 50, color: myColors.textHint}}>
              Lưu ý: Tất cả các đặc quyền sẽ mất khi thẻ của bạn hết hạn
            </Text>
          </>
        )}
      </View>
    </Screen>
  );
};

export default MyVipTicket;

// const styles = StyleSheet.create({});
