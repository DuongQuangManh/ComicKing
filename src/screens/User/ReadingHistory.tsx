import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Screen } from '../screen'
import { Header } from '@components'
import { IComic } from '@models';
import { FlashList } from '@shopify/flash-list'
import { useAppDispatch, useAppSelector } from '@redux/store';

type ComponentProps = {
  listComic: IComic[]
};

const ReadingHistory: React.FC<ComponentProps> = ({ listComic = [] }) => {
  const dispatch = useAppDispatch();
  const { historyReading = [] } = useAppSelector(state => state.userSlice);

  return (
    <Screen>
      <Header text="History" />

      
    </Screen>
  )
}

export default ReadingHistory

const styles = StyleSheet.create({})