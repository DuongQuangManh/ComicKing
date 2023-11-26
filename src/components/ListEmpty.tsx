import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Icon, Icons, Text} from '@components';
import {myColors} from '@utils';
import { useAppSelector } from '@redux/store';
const ListEmpty = () => {
  const colorTheme = useAppSelector(state => state.userSlice.colorTheme);
  return (
    <View style={styles.container}>
      <Icon
        type={Icons.Ionicons}
        name="warning-outline"
        size={80}
        color={colorTheme === 'light' ? myColors.textHint : myColors.transparentWhite}
      />
      <Text color={colorTheme === 'light' ? myColors.textHint : myColors.transparentWhite}>List is empty.</Text>
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
