import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Screen } from '../screen'
import { Header } from '@components'
import { IReadingHistory } from '@models';
import { WINDOW_WIDTH, helper, myColors } from '@utils';
import { FlashList } from '@shopify/flash-list'
import { useAppDispatch, useAppSelector } from '@redux/store';
import { sendRequest } from '@api';

type StateType = {
  listHistory: IReadingHistory[]
  isLoading: boolean
};

const ReadingHistory = () => {
  const { id } = useAppSelector(state => state.userSlice.document ?? {});
  const [state, setState] = useState<StateType>({
    listHistory: [],
    isLoading: true
  });
  const { listHistory, isLoading } = state;

  useEffect(() => {
    getListHistory();
  }, []);

  const getListHistory = async () => {
    setState(pre => ({ ...pre, isLoading: true }))
    try {
      const res = await sendRequest('api/user/getHistoryReading', {
        userId: id,
      })
      if (res.err == 200) {
        setState(pre => ({
          ...pre,
          listHistory: res.data ?? [],
          isLoading: false
        }))
      } else {
        helper.showErrorMsg(res.message)
        setState(pre => ({
          ...pre,
          isLoading: false
        }))
      }
    } catch (error) {
      console.log(error);
      setState(pre => ({
        ...pre,
        isLoading: false
      }));
    }
  }

  // const dispatch = useAppDispatch();
  // const { historyReading = [] } = useAppSelector(state => state.userSlice);



  return (
    <Screen>
      <Header text="History" />


    </Screen>
  )
}

export default ReadingHistory

const styles = StyleSheet.create({})