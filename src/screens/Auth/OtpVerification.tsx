import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useRoute } from '@react-navigation/core'
import { StackParamList } from '@navigations'
import { Screen } from '../screen'
import { CodeInput, Header, Text } from '@components'
import { useAppDispatch } from '@redux/store'
import {
    loginVerifyOtpAction,
    registerVerifyOtpAction,
    forgotPassVerifyOtpAction,
    resendOtp
} from '@redux/authSlice'
import { myColors } from '@utils'

const OtpVerification = () => {
    const dispatch = useAppDispatch()
    const { message, verifyAction, email } = useRoute<RouteProp<StackParamList, 'otpVerification'>>().params
    const [state, setState] = useState({
        cooldown: 0
    })

    useEffect(() => {
        const interval = setTimeout(() => {
            if (state.cooldown > 0) {
                setState(pre => ({ ...pre, cooldown: pre.cooldown - 1 }))
            }
        }, 1000)

        return () => clearTimeout(interval)
    }, [state.cooldown])

    const onFull = (code: string) => {
        switch (verifyAction) {
            case 'login':
                return dispatch(loginVerifyOtpAction({ code, email }))
            case 'changePass':
            case 'forgotPass':
                return dispatch(forgotPassVerifyOtpAction({ code, email }))
            case 'register':
                return dispatch(registerVerifyOtpAction({ code, email }))
        }
    }

    const onResendOtp = async () => {
        await dispatch(resendOtp({ email }))
        setState(pre => ({ ...pre, cooldown: 60 }))
    }

    return (
        <Screen preset='scroll'>
            <Header text='Verity OTP code' />
            <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                <Text style={{ lineHeight: 18 }}>{message}</Text>
                <CodeInput onFull={onFull} />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <TouchableOpacity
                        disabled={state.cooldown > 0}
                        onPress={onResendOtp}
                    >
                        <Text type='semibold_18'
                            style={{ color: state.cooldown <= 0 ? myColors.primary : myColors.textHint }}>Resend</Text>
                    </TouchableOpacity>
                    {state.cooldown > 0
                        ? <Text style={{ paddingStart: 5, width: 42 }}>{`(${state.cooldown}s)`}</Text>
                        : <View style={{ width: 42, height: 0 }} />}
                </View>
            </View>
        </Screen>
    )
}

export default OtpVerification

const styles = StyleSheet.create({})