import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Screen} from '../screen';
import {FlashList} from '@shopify/flash-list';
import {useAppSelector} from '@redux/store';
import {AttenDance} from '@items';
import {Text} from '@components';

const Operation = () => {
  const data = useAppSelector(state => state.attendanceSlice);
  return (
    <Screen preset="scroll">
      <Text type="bold_26">Điểm danh</Text>
      <View style={{marginTop: 10}}>
        <FlashList
          data={data?.data}
          renderItem={({item}) => <AttenDance item={item} />}
          estimatedItemSize={100}
          estimatedListSize={{
            width: 100,
            height: 100,
          }}
          horizontal={true}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text>abc</Text>
    </Screen>
  );
};

export default Operation;

const styles = StyleSheet.create({});
