import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { myColors } from '@utils'
import { Button, Text } from '@components'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackParamList } from '@navigations'
import Modal from 'react-native-modal'
import { useAppTheme } from '@hooks'

const Message = () => {
    const {
        title,
        msgType,
        onOk,
        message
    } = useRoute<RouteProp<StackParamList, 'message'>>().params
    const theme = useAppTheme();
    return (
        <Modal
            isVisible
            onBackdropPress={onOk}
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View style={[styles.centeredView,{backgroundColor: theme.background}]}>
                <View style={{ alignItems: 'center' }}>
                    <Text type='semibold_18'>{title}</Text>
                    <Image
                        style={{ width: 100, height: 100, marginTop: 5 }}
                        source={msgType == 'error'
                            ? require('@assets/icons/error.png')
                            : require('@assets/icons/success.png')}
                    />
                </View>
                <Text
                    style={{
                        maxWidth: '82%',
                        textAlign: 'center'
                    }}
                >{message}</Text>
                <Button width={'90%'} text='OK' onPress={onOk} />
            </View>
        </Modal>
    )
}

export default Message

const styles = StyleSheet.create({
    centeredView: {
        width: '90%',
        height: 290,
        borderRadius: 8,
        backgroundColor: myColors.background,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 18,
        paddingBottom: 10
    }
})