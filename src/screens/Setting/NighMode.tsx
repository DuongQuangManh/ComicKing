import { StyleSheet, Text, View, Appearance, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Screen } from '../screen';
import { Header, Icons } from '@components';
import NightItem from './components/NightItem';
import { useTheme } from '@react-navigation/native';
import { myColors } from '@utils';
// import { useColorScheme } from 'nativewind';
const NighMode = () => {
  const colorScheme = useColorScheme();
  const theme = Appearance.getColorScheme();
  // const [selectedValue, setSelectedValue] = useState(colorScheme);
  // const [theme,setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme)=>{
  //   console.log(scheme);

  // })

  const handleTurnOff = () => {
    if(theme === 'dark') Appearance.setColorScheme('light');
    // console.log(Appearance.getColorScheme());
  }
  const handleTurnOn = () => {
    if(theme === 'light') Appearance.setColorScheme('dark');
    // console.log(Appearance.getColorScheme());
  }


  return (
    <Screen style={{ paddingHorizontal: 10, backgroundColor: theme === 'light' ? myColors.background : myColors.background_dark }}>
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
        isSelect={theme === 'light' ? true : false}
        onPress={handleTurnOff} />

      <NightItem
        name='On'
        value="dark"
        isSelect={theme === 'dark' ? true : false}
        onPress={handleTurnOn} />

      <View style={{ margin: 20 }}>
        <Text>Chế độ: {Appearance.getColorScheme()}</Text>
      </View>

    </Screen>
  );
};

export default NighMode;

const styles = StyleSheet.create({});
