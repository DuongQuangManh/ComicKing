import {
  Image,
  NativeEventEmitter,
  StyleSheet,
  View,
  NativeModules,
} from 'react-native';
import React, {useEffect} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList, goBack, navigate} from '@navigations';
import {Screen} from '../screen';
import {Button, Header, Text} from '@components';
import {constants, createOrder, helper} from '@utils';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {sendRequest} from '@api';

const {PayZaloBridge} = NativeModules;

var refTxnId = '';
const VipTicketDetail = () => {
  const {listAvatarFrame, listAvatarTitle, vipTicket} =
    useRoute<RouteProp<StackParamList, 'vipTicketDetail'>>().params;
  const {id} = useAppSelector(state => state.userSlice.document ?? {});

  useEffect(() => {
    const payZaloBridgeEmitter = new NativeEventEmitter(PayZaloBridge);
    const payZaloListener = payZaloBridgeEmitter.addListener(
      'EventPayZalo',
      (data: any) => {
        if (data.returnCode == 1) {
          requestEndTransaction(constants.TRANSACTION_STATUS.SUCCESS);
        } else if (data.returnCode == -1) {
          requestEndTransaction(constants.TRANSACTION_STATUS.FAILED);
        } else {
          requestEndTransaction(constants.TRANSACTION_STATUS.CANCELED);
        }
      },
    );
    return () => {
      payZaloListener.remove();
    };
  }, []);

  const requestEndTransaction = async (status: string) => {
    helper.showLoading();
    try {
      const respone = await sendRequest('api/user/requestEndTransaction', {
        status,
        txnId: refTxnId,
      });
      helper.hideLoading();
      if (respone.err == 200) {
        goBack(2);
        navigate('transactionStatus', respone.data);
      } else {
        helper.showErrorMsg(respone.message);
      }
    } catch (error) {
      helper.hideLoading();
      console.log(error);
    }
  };

  const onBuyVipTicket = async () => {
    const transData = await createOrder(vipTicket.price);
    if (transData?.returnCode == 1) {
      helper.showLoading();
      try {
        const respone = await sendRequest(
          'api/user/createVipTicketTransaction',
          {
            txnToken: transData.token,
            amount: vipTicket.price,
            vipTicketId: vipTicket.id,
            userId: id,
          },
        );
        helper.hideLoading();
        if (respone.err == 200) {
          refTxnId = respone.data?.txnId || '';
          payOrder(transData.token);
        } else {
          helper.showErrorMsg(respone.message);
        }
      } catch (error) {
        helper.hideLoading();
        console.log(error);
      }
    }
  };

  const payOrder = (token: string) => {
    var payZP = NativeModules.PayZaloBridge;
    payZP.payOrder(token);
  };

  return (
    <Screen preset="scroll">
      <Header text={vipTicket.name} />
      <View style={{paddingHorizontal: 16}}>
        <Text style={{marginTop: 20}} type="medium_16">
          Nhận ngay :{' '}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}>
          <Text>+ {vipTicket.coinExtra} xu</Text>
          <Text>+ {vipTicket.expExtra} exp</Text>
        </View>
        <Text style={{marginTop: 20}} type="medium_16">
          {vipTicket.duration} ngày tiếp theo nhận :
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 10,
          }}>
          <Text>+ {vipTicket.coinExtraDaily} xu/ngày</Text>
          <Text>+ {vipTicket.expExtraDaily} exp/ngày</Text>
        </View>
        <Text style={{marginTop: 20}}>Mở khóa khung avatar mới : </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
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
        <Text style={{marginTop: 20}}>Mở khóa danh hiệu mới : </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
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
      <Button
        onPress={onBuyVipTicket}
        style={{marginVertical: 50, alignSelf: 'center'}}
        text={helper.displayMoney(vipTicket.price) + ' ' + vipTicket.currency}
      />
    </Screen>
  );
};

export default VipTicketDetail;

const styles = StyleSheet.create({});
