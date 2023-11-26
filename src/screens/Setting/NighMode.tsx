import { StyleSheet, Text, View, Appearance, useColorScheme } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Screen } from '../screen';
import { Header, Icons } from '@components';
import NightItem from './components/NightItem';
import {useAppDispatch, useAppSelector} from '@redux/store';
import { myColors } from '@utils';
import { setColorTheme } from '@redux/userSlice';

const NighMode = () => {
  const dispatch = useAppDispatch();
  const colorTheme = useAppSelector(state => state.userSlice.colorTheme ?? '');
  const colorScheme = useColorScheme();
  const theme = Appearance.getColorScheme();
  // const [selectedValue, setSelectedValue] = useState(colorScheme);
  // const [theme,setTheme] = useState(Appearance.getColorScheme());
  // Appearance.addChangeListener((scheme)=>{
  //   console.log(scheme);

  // })

  const handleTurnOff = () => {
    dispatch(setColorTheme('light'))
  }
  const handleTurnOn = () => {
    dispatch(setColorTheme('dark'))
  }


  return (
    <Screen>
      <Header text='Night Mode' />
      <NightItem
        name='Off'
        value="light"
        isSelect={colorTheme === 'light' ? true : false}
        onPress={handleTurnOff} />

      <NightItem
        name='On'
        value="dark"
        isSelect={colorTheme === 'dark' ? true : false}
        onPress={handleTurnOn} />
    </Screen>
  );
};

export default NighMode;

const styles = StyleSheet.create({});
