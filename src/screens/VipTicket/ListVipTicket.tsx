import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {Screen} from '../screen';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {Header, Text} from '@components';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {getVipTicket} from '@redux/paymentSlice';
import {sendRequest} from '@api';
import {navigate} from '@navigations';
import { useAppTheme } from '@hooks';

const ITEM_WIDTH = WINDOW_WIDTH - 32;

const ListVipTicket = () => {
  const dispatch = useAppDispatch();
  const {listVipTicket = []} = useAppSelector(state => state.paymentSlice);
  const theme = useAppTheme();
  useEffect(() => {
    dispatch(getVipTicket());
  }, []);

  const onShowDetail = async (vipTicketId: string) => {
    helper.showLoading();
    try {
      const respone = await sendRequest('api/user/detailVipTicket', {
        vipTicketId,
      });
      helper.hideLoading();

      if (respone.err == 200) {
        navigate('vipTicketDetail', respone.data);
      } else {
        helper.showErrorMsg(respone.message);
      }
    } catch (error) {
      helper.showLoading();
      console.log('Error : ', error);
    }
  };

  return (
    <Screen
      preset="scroll"
      showsVerticalScrollIndicator={false}>
      <Header text="Thẻ Tháng" style={{backgroundColor: 'transparent'}} />
      <View style={{paddingHorizontal: 16, paddingBottom: 20}}>
        {listVipTicket.map((item, index) => (
          <View key={index} style={[styles.itemContainer,{backgroundColor: theme.textHint}]}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text type="medium_18">{item.name}</Text>
              <Text
                style={{color: '#ba1f1f'}}
                type="medium_18">{`${helper.displayMoney(item.price)} ${
                item.currency
              }`}</Text>
            </View>
            <View style={styles.divider} />
            <View style={{flexDirection: 'row', paddingVertical: 15}}>
              <View style={{alignItems: 'center'}}>
                <Text type="semibold_12">{item.duration} Ngày</Text>
                <Image
                  style={{width: 60, height: 60}}
                  source={
                    item.image
                      ? {uri: item.image}
                      : require('@assets/icons/vip1.png')
                  }
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text type="medium_16" style={{color: myColors.primary}}>
                    + {helper.displayMoney(item.coinExtra)} xu
                  </Text>
                  <Text type="medium_16" style={{color: myColors.primary}}>
                    + {helper.displayMoney(item.expExtra)} exp
                  </Text>
                </View>
                <View>
                  <Text style={{color: '#1eb1a7'}}>
                    + {helper.displayMoney(item.coinExtraDaily)} xu/daily
                  </Text>
                  <Text style={{color: '#1eb1a7'}}>
                    + {helper.displayMoney(item.expExtraDaily)} exp/daily
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => onShowDetail(item.id)}
              style={styles.btn}>
              <Text color="#fff">Chi tiết</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </Screen>
  );
};

export default ListVipTicket;

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    marginTop: 25,
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 1,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#f9a828',
    marginVertical: 15,
  },
  btn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 100,
    height: 40,
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: myColors.primary,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
