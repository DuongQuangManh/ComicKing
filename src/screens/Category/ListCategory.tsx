import {
  StyleSheet,
  ActivityIndicator,
  View,
  RefreshControl,
} from 'react-native';
import React, {useEffect} from 'react';
import {Screen} from '../screen';
import {useAppDispatch, useAppSelector} from '@redux/store';
import {getCate} from '@redux/categorySlice';
import {FlashList} from '@shopify/flash-list';
import CategoryItem from './components/CategoryItem';
import {WINDOW_WIDTH, myColors} from '@utils';
import {Header, Text} from '@components';
import {navigate} from '@navigations';

const ITEM_WIDTH = WINDOW_WIDTH / 2;

const ListCategory = () => {
  const dispatch = useAppDispatch();
  const {data: listCategory, loading} = useAppSelector(
    state => state.categorySlice,
  );

  useEffect(() => {
    dispatch(getCate());
  }, []);

  return (
    <Screen>
      <Header text='Thể loại'/>
      {loading ? (
        <ActivityIndicator
          style={{height: '85%'}}
          size="large"
          color={myColors.primary}
        />
      ) : (
        <FlashList
          refreshControl={
            <RefreshControl
              onRefresh={() => dispatch(getCate())}
              refreshing={false}
              colors={[myColors.primary]}
            />
          }
          contentContainerStyle={{paddingBottom: 100}}
          numColumns={2}
          estimatedItemSize={ITEM_WIDTH}
          showsVerticalScrollIndicator={false}
          data={listCategory}
          renderItem={({item}) => (
            <CategoryItem
              title={item.title}
              numOfComic={item.numOfComic}
              onPress={() =>
                navigate('categoryDetail', {
                  categoryId: item.id,
                  description: item.description,
                  numOfComic: item.numOfComic,
                  title: item.title,
                })
              }
            />
          )}
        />
      )}
    </Screen>
  );
};

export default ListCategory;

const styles = StyleSheet.create({});
