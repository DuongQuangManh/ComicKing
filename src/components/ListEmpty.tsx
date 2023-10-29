import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Icon, Icons, Text} from '@components';
import {myColors} from '@utils';

const ListEmpty = () => {
  return (
    <View style={styles.container}>
      <Icon
        type={Icons.Ionicons}
        name="warning-outline"
        size={80}
        color={myColors.textHint}
      />
      <Text color={myColors.textHint}>List is empty.</Text>
    </View>
  );
};

export default ListEmpty;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 100,
  },
});
