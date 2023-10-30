import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { Screen } from '../screen';
import { Header, Icons } from '@components';
import MenuItem from '../Home/components/MenuItem';
const NighMode = () => {
  const [ColorScheme, setColorScheme] = useState(useColorScheme());

  // const colorScheme = useColorScheme();

  const handleTurnOff = () => {
    setColorScheme('light')
  }
  const handleTurnOn = () => {
    setColorScheme('dark')
  }
  return (
    <View>
      <Screen style={{ paddingHorizontal: 10, backgroundColor: ColorScheme === 'dark' ? '#000' : '#fff' }}>
        <Header text='Night Mode' />
        <MenuItem
          name="Off"
          iconName="sunny-outline"
          iconType={Icons.Ionicons}
          onPress={handleTurnOff}
        />
        <MenuItem
          name="On"
          iconName="moon-outline"
          iconType={Icons.Ionicons}
          onPress={handleTurnOn}
        />
        <Text>Giao diện: {ColorScheme}</Text>
        <View style={{ height: 200 }}>
          <Text>Giao diện hiện tại: {ColorScheme}</Text>

          {ColorScheme === 'dark' ? (
            <Text>Đang ở chế độ tối</Text>
          ) : (
            <Text>Đang ở chế độ sáng</Text>
          )}
        </View>
      </Screen>
    </View>
  );
};

export default NighMode;

const styles = StyleSheet.create({});
