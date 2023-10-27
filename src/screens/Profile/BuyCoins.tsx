import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {Header, Text} from '@components';
import FastImage from 'react-native-fast-image';
import {WINDOW_WIDTH, myColors} from '@utils';
import CoinItem from './Components/CoinItem';

const BuyCoins = () => {
  return (
    <Screen preset="scroll">
      <Header text="Nạp xu" />
      <CoinItem
        image={require('@assets/icons/vip1.png')}
        title="1 tháng"
        description="10 xu/ngày (30 ngày)"
        price="100.000"
      />
      <CoinItem
        image={require('@assets/icons/vip2.png')}
        title="6 tháng"
        description="10 xu/ngày (180 ngày)"
        price="500.000"
      />
      <CoinItem
        image={require('@assets/icons/vip3.jpg')}
        title="1 năm (+1 tháng)"
        description="10 xu/ngày (390 ngày)"
        price="1.000.000"
      />

      <View style={styles.box1}>
        <CoinItem
          image={require('@assets/icons/coin_v2_100.png')}
          title="100"
          price="30.000"
        />
        <CoinItem
          image={require('@assets/icons/coin_v2_600.png')}
          description="+100 điểm lv"
          title="350"
          price="100.000"
        />
        <CoinItem
          image={require('@assets/icons/coin_v2_1000.png')}
          description="+200 điểm lv"
          title="700"
          price="200.000"
        />
        <CoinItem
          image={require('@assets/icons/coin_v2_8000.png')}
          description="+500 điểm lv"
          title="1800"
          price="500.000"
        />
        <CoinItem
          image={require('@assets/icons/coin_v2_10000.png')}
          description="+1.000 điểm lv"
          title="3650"
          price=" 1.000.000"
        />
      </View>
    </Screen>
  );
};

export default BuyCoins;

const styles = StyleSheet.create({
  itemCoin: {
    width: WINDOW_WIDTH - 30,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderColor: myColors.gray,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: myColors.background,
  },
  box1: {
    width: WINDOW_WIDTH,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: myColors.gray,
    marginTop: 20,
    paddingBottom: 50,
  },
});
