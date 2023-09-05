import {
    StyleSheet,
    Text,
    View,
    StyleProp,
    ViewStyle
} from 'react-native'
import React from 'react'
import { myColors } from '@utils'

interface BadgeProps {
    badge: number,
    style: StyleProp<ViewStyle>
}

const Badge: React.FC<BadgeProps> = ({
    badge,
    style
}) => {
    return (
        <>
            {badge > 0 ? <View style={[styles.container, style]}>
                <Text style={styles.badge}>{badge}</Text>
            </View> : <></>}
        </>
    )
}

export default Badge

const styles = StyleSheet.create({
    container: {
        backgroundColor: myColors.primary,
        width: 15,
        height: 15,
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },
    badge: {
        fontSize: 11,
        fontWeight: 'bold',
        color: 'black'
    }
})