import { StyleSheet, Text, View, Appearance,useColorScheme } from 'react-native';
import React, { useState,useEffect} from 'react';
import { Screen } from '../screen';
import { Header, Icons } from '@components';
import MenuItem from '../Home/components/MenuItem';
import NightItem from './components/NightItem';
import { useTheme } from '@react-navigation/native';
// import { useColorScheme } from 'nativewind';
const NighMode = () => {
  const [colorScheme, setColorScheme] = useState(useColorScheme()) ;
  const [selectedValue, setSelectedValue] = useState(colorScheme);
  // const [theme,setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme)=>{
  //   console.log(scheme);

  // })

  const handleTurnOff = () => {
    setColorScheme('light')
  }
  const handleTurnOn = () => {
    setColorScheme('dark')
  }

  
  return (
    <View>
      <Screen style={{ paddingHorizontal: 10}}>
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

      </Screen>
    </View>
  );
};

export default NighMode;

const styles = StyleSheet.create({});
