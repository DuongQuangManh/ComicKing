import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Screen} from '../screen';
import {Header} from '@components';
import {useAppSelector} from '@redux/store';
import {FlashList} from '@shopify/flash-list';
import AvatarName from './components/AvatarName';
import {WINDOW_WIDTH} from '@utils';
import {RouteProp, useRoute} from '@react-navigation/native';
import {StackParamList} from '@navigations';
import {ComicSmall} from '@items';
const Follow = () => {
  const {comicFollowing, authorFollowing} = useAppSelector(
    state => state.userSlice,
  );
  const {type} = useRoute<RouteProp<StackParamList, 'follow'>>().params;

  const List = useCallback(({type}: any) => {
    let jsxItem = null;
    switch (type) {
      case 'following':
        jsxItem = (
          <FlashList
            data={authorFollowing.data}
            renderItem={({item}) => <AvatarName item={item} />}
            estimatedItemSize={WINDOW_WIDTH}
            estimatedListSize={{width: WINDOW_WIDTH, height: 100}}
          />
        );
        break;
      case 'follower':
        //   jsxItem = (
        //     <FlashList
        //   data={following.data}
        //   renderItem={({item}) => <AvatarName item={item} />}
        //   estimatedItemSize={WINDOW_WIDTH}
        //   estimatedListSize={{width: WINDOW_WIDTH, height: 100}}
        // />
        //   );
        break;
      case 'comicfollowing':
        jsxItem = (
          <FlashList
            data={comicFollowing.data}
            renderItem={({item}) => <ComicSmall item={item} />}
            estimatedItemSize={WINDOW_WIDTH}
            estimatedListSize={{width: WINDOW_WIDTH, height: 100}}
            numColumns={3}
          />
        );
    }
    return jsxItem;
  }, []);

  return (
    <Screen>
      <Header text="Đang theo dõi" />
      <List type={type} />
      {/* <FlashList
        data={following.data}
        renderItem={({item}) => <AvatarName item={item} />}
        estimatedItemSize={WINDOW_WIDTH}
        estimatedListSize={{width: WINDOW_WIDTH, height: 100}}
      /> */}
    </Screen>
  );
};

export default Follow;

const styles = StyleSheet.create({});
