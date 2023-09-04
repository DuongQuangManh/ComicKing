import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { useAppDispatch } from '@redux/store'
import { forgotPassAction } from '@redux/authSlice'
import { Screen } from '../screen'
import { Button, DatePicker, Header, Input } from '@components'

const ForgotPassword = () => {
    const dispatch = useAppDispatch()
    const [state, setState] = useState({
        email: '',
        birthDay: '',
    })

    const forgotPass = () => {
        dispatch(forgotPassAction({ email: state.email, birthDay: state.birthDay }))
    }

    return (
        <Screen preset='scroll'>
            <Header text="Forgot Password" />
            <View style={{
                justifyContent: 'center',
                flex: 1,
                alignItems: 'center',
                paddingTop: 25,
                paddingBottom: 10
            }}>
                <Input
                    value={state.email}
                    isTrim
                    onChangeText={email => setState(pre => ({ ...pre, email }))}
                    placeholder="Email"
                    style={{ marginTop: 15 }}
                />
                <DatePicker
                    placeholder='Birth day'
                    onChangeText={birthDay => setState(pre => ({ ...pre, birthDay: birthDay ?? '' }))}
                    value={state.birthDay}
                />
                <Button
                    disable={
                        !state.email
                        || !state.birthDay
                    }
                    onPress={forgotPass}
                    style={{ marginTop: 45 }}
                    text='Next'
                />
            </View>
        </Screen>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({})