import {StyleSheet, Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList, goBack} from '@navigations';
import {Screen} from '../screen';
import {constants, helper} from '@utils';
import {Button, Text} from '@components';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {getUserWalletAction} from '@redux/userSlice';

const TransactionStatus = () => {
  const dispatch = useAppDispatch();
  const {id} = useAppSelector(state => state.userSlice.document);
  const {price, status, transactionName} =
    useRoute<RouteProp<StackParamList, 'transactionStatus'>>().params;

  useEffect(() => {
    dispatch(getUserWalletAction({userId: id}));
  }, []);

  return (
    <Screen>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={{width: 150, height: 150}}
          source={
            status == constants.TRANSACTION_STATUS.SUCCESS
              ? require('@assets/images/successful.png')
              : require('@assets/images/cancel.png')
          }
        />
        <Text
          type="regular_16"
          style={{
            marginVertical: 20,
            paddingHorizontal: 20,
            textAlign: 'center',
          }}>
          Bạn đã{' '}
          {status == constants.TRANSACTION_STATUS.SUCCESS
            ? 'hoàn thành'
            : 'hủy'}{' '}
          {transactionName} mệnh giá {helper.displayMoney(price || 0)} VNĐ
        </Text>
        <Button text="Xác nhận" onPress={goBack} style={{marginTop: 30}} />
      </View>
    </Screen>
  );
};

export default TransactionStatus;

const styles = StyleSheet.create({});
