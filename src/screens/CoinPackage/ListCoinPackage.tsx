import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {useAppSelector} from '@redux/store';
import {WINDOW_WIDTH, helper, myColors} from '@utils';
import {Screen} from '../screen';
import {Header, Text} from '@components';
import {TouchableOpacity} from 'react-native';

const ITEM_WIDTH = WINDOW_WIDTH - 32;

const ListCoinPackage = () => {
  const {listCoinPackage = []} = useAppSelector(state => state.paymentSlice);

  return (
    <Screen
      statusBarColor="#f9f9f9bc"
      style={{backgroundColor: '#f9f9f9bc'}}
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
                  <Text color={myColors.textHint} style={{marginStart: 4}}>
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
