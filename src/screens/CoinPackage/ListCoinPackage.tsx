import {
  Image,
  StyleSheet,
  View,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {WINDOW_WIDTH, constants, createOrder, helper, myColors} from '@utils';
import {Screen} from '../screen';
import {Header, Text} from '@components';
import {TouchableOpacity} from 'react-native';
import {sendRequest} from '@api';
import {getCoinPackage} from '@redux/paymentSlice';
import {navigate} from '@navigations';
import { useAppTheme } from '@hooks';

const {PayZaloBridge} = NativeModules;

const ITEM_WIDTH = WINDOW_WIDTH - 32;

var refTxnId = '';
const ListCoinPackage = () => {
  const dispatch = useAppDispatch();
  const {listCoinPackage = []} = useAppSelector(state => state.paymentSlice);
  const {id} = useAppSelector(state => state.userSlice.document ?? {});
  const theme = useAppTheme();
  useEffect(() => {
    dispatch(getCoinPackage());
  }, []);

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
        navigate('transactionStatus', respone.data);
      } else {
        helper.showErrorMsg(respone.message);
      }
    } catch (error) {
      helper.hideLoading();
      console.log(error);
    }
  };

  const onBuyCoin = async (amount: number, coinPackageId: string) => {
    const transData = await createOrder(amount);
    if (transData?.returnCode == 1) {
      helper.showLoading();
      try {
        const respone = await sendRequest(
          'api/user/createCoinPackageTransaction',
          {
            txnToken: transData.token,
            amount,
            coinPackageId,
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
    <Screen
      preset="scroll"
      showsVerticalScrollIndicator={false}>
      <Header text="Nạp Xu" style={{backgroundColor: 'transparent'}} />
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 20,
        }}>
        {listCoinPackage.map((item, index) => (
          <TouchableOpacity
            onPress={() => onBuyCoin(item.price, item.id)}
            activeOpacity={0.6}
            key={index}
            style={[
              styles.itemContainer,
              {
                backgroundColor: item.suggest ? '#fff2f3' : '#fff',
              },
            ]}>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
              <Image
                style={{width: 60, height: 60}}
                source={
                  item.image
                    ? {uri: item.image}
                    : require('@assets/icons/coin_v2_10000.png')
                }
              />
              <View style={{marginStart: 20}}>
                <View style={{flexDirection: 'row'}}>
                  <Text type="medium_18">{item.coin}</Text>
                  <Text color={theme.text} style={{marginStart: 4}}>
                    xu
                  </Text>
                </View>
                <Text color={myColors.primary} type="medium_12">
                  + {item.exp} exp
                </Text>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text
                style={{color: '#ba1f1f'}}
                type="medium_18">{`${helper.displayMoney(item.price)} ${
                item.currency
              }`}</Text>
            </View>
            {item.suggest && (
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  backgroundColor: myColors.primary,
                  borderTopRightRadius: 6,
                }}>
                <Text
                  style={{paddingVertical: 2, paddingHorizontal: 18}}
                  color="#fff">
                  Hot
                </Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Screen>
  );
};

export default ListCoinPackage;

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    marginTop: 25,
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#f9a828',
    marginVertical: 15,
  },
});
