import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {AttenDance} from '@items';
import {Text} from '@components';
import {getAttendance} from '@redux/attendanceSlice';
import {myColors} from '@utils';

const Operation = () => {
  const dispatch = useAppDispatch();
  const {id} = useAppSelector(state => state.userSlice.document ?? {});
  const data = useAppSelector(state => state.attendanceSlice ?? {});
  return (
    <Screen
      preset="scroll"
      refreshControl={
        <RefreshControl
          onRefresh={() => dispatch(getAttendance(id))}
          refreshing={false}
          colors={[myColors.primary]}
        />
      }>
      <View style={{paddingVertical: 20}}>
        <Text style={{marginStart: 10}} type="semibold_22">
          Điểm danh
        </Text>
        <View
          style={{
            marginTop: 10,
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}>
          {/* <FlatList
            contentContainerStyle={{paddingRight: 20}}
            data={data?.data}
            renderItem={({item}) => <AttenDance item={item} />}
            horizontal={true}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false}
          /> */}
          {data.data?.map((item, index) => (
            <AttenDance item={item} key={index} />
          ))}
        </View>
      </View>
    </Screen>
  );
};

export default Operation;

const styles = StyleSheet.create({});
