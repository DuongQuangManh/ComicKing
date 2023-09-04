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
        birthday: '',
        password: '',
        confirmPass: '',
        isHidePass: true
    })

    const forgotPass = () => {
        dispatch(forgotPassAction({
            email: state.email,
            birthday: state.birthday,
            password: state.password,
            confirmPassword: state.confirmPass
        }))
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
                    placeholder='Birthday'
                    onChangeText={birthday => setState(pre => ({ ...pre, birthday: birthday ?? '' }))}
                    value={state.birthday}
                />
                <Input
                    isTrim
                    value={state.password}
                    onChangeText={password => setState(pre => ({ ...pre, password }))}
                    placeholder="New Password"
                    secureTextEntry={state.isHidePass}
                    style={{ marginTop: 15 }}
                    isRightIcon
                    onChangeShowPass={isHidePass => setState(pre => ({ ...pre, isHidePass }))}
                />
                <Input
                    isTrim
                    value={state.confirmPass}
                    onChangeText={confirmPass => setState(pre => ({ ...pre, confirmPass }))}
                    placeholder="Confirm New Password"
                    secureTextEntry={state.isHidePass}
                    style={{ marginTop: 15 }}
                    isRightIcon
                    onChangeShowPass={isHidePass => setState(pre => ({ ...pre, isHidePass }))}
                />
                <Button
                    disable={
                        !state.email
                        || !state.birthday
                        || !state.password
                        || !(state.password == state.confirmPass)
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