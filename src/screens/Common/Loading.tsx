import { myColors } from '@utils'
import React from 'react'
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native'
import { Text } from 'react-native-paper'

const Loading = () => {

    return (
        <Modal visible transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <ActivityIndicator size="large" color={myColors.primary} />
                    <Text style={styles.text}>Loading...</Text>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: myColors.backgroundMsg,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: myColors.background,
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        marginLeft: 10,
    },
})

export default Loading
