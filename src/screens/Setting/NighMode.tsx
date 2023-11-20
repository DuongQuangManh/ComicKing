import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useColorScheme } from 'react';
import { Screen } from '../screen';
import { Header, Icons } from '@components';
import MenuItem from '../Home/components/MenuItem';
import NightItem from './components/NightItem';
const NighMode = () => {
  const [ColorScheme, setColorScheme] = useColorScheme();

  // const colorScheme = useColorScheme();

  const handleTurnOff = () => {
    setColorScheme('light')
  }
  const handleTurnOn = () => {
    setColorScheme('dark')
  }
  return (
    <View>
      <Screen style={{ paddingHorizontal: 10, backgroundColor: useColorScheme === 'dark' ? '#000' : '#fff' }}>
        <Header text='Night Mode' />
        {/* <MenuItem
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
        /> */}
        <NightItem
          name='Off'
          value="light"
          onPress={handleTurnOff} />

        <NightItem
          name='On'
          value="dark"
          onPress={handleTurnOn} />


        <Text>Giao diện: {useColorScheme}</Text>
        <View style={{ height: 200 }}>
          <Text>Giao diện hiện tại: {useColorScheme}</Text>

          {useColorScheme === 'dark' ? (
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
