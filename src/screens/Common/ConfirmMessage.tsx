import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { myColors } from '@utils'
import { Button, Text } from '@components'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StackParamList } from '@navigations'
import Modal from 'react-native-modal'

const ConfirmMessage = () => {
    const {
        title,
        onOk,
        message,
        onCancel
    } = useRoute<RouteProp<StackParamList, 'confirmMessage'>>().params

    return (
        <Modal
            isVisible
            onBackdropPress={onCancel}
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View style={styles.centeredView}>
                <View style={{ alignItems: 'center' }}>
                    <Text type='semibold_18'>{title}</Text>
                    <Image
                        style={{ width: 85, height: 85, marginTop: 5 }}
                        source={require('@assets/icons/warning.png')}
                    />
                </View>
                <Text
                    style={{
                        maxWidth: '82%',
                        textAlign: 'center'
                    }}
                >{message}</Text>
                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
                    <Button
                        buttonColor={myColors.background}
                        textColor={myColors.textHint}
                        width={'40%'}
                        text='Cancel'
                        onPress={onCancel} />
                    <Button
                        width={'40%'}
                        text='OK'
                        onPress={onOk} />
                </View>
            </View>
        </Modal>
    )
}

export default ConfirmMessage

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