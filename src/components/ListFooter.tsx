import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from '@components';
import {myColors} from '@utils';

type ComponentProps = {
  canLoadMore: boolean;
  isLoadMore: boolean;
  length?: number;
};

const ListFooter: React.FC<ComponentProps> = ({
  canLoadMore,
  isLoadMore,
  length = 0,
}) => {
  return (
    <View>
      {/* {(length > 0) && (
        <>
          {isLoadMore && (
            <ActivityIndicator style={{height: 50}} color={myColors.primary} />
          )}
          {!canLoadMore && (
            <View style={styles.loadMoreView}>
              <Text type="light_13">Can't load more</Text>
            </View>
          )}
        </>
      )} */}
    </View>
  );
};

export default ListFooter;

const styles = StyleSheet.create({
  loadMoreView: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
