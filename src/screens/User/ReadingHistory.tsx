import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Screen } from '../screen'
import { Header } from '@components'
import { FlashList } from '@shopify/flash-list'
import {useAppDispatch, useAppSelector} from '@redux/store';

const ReadingHistory = () => {
  const dispatch = useAppDispatch();
  return (
    <Screen>
      <Header text="History"/>
        

    </Screen>
  )
}

export default ReadingHistory

const styles = StyleSheet.create({})