import { StyleSheet, ViewStyle, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { WINDOW_WIDTH, myColors } from '@utils';
import { Text } from '@components';

interface GgLoginBtnProps {
    onPress: () => void,
    theme?: 'dark' | 'light',
    width?: ViewStyle['width'],
    borderRadius?: number,
    containerStyle?: ViewStyle
}

const ggTheme = {
    light: {
        primary: '#fff',
        textColor: myColors.text
    },
    dark: {
        primary: '#4285F4',
        textColor: '#fff'
    }
}

const GgLoginBtn: React.FC<GgLoginBtnProps> = ({
    width = WINDOW_WIDTH - 50,
    borderRadius = 3,
    containerStyle,
    theme = 'light',
    onPress
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                containerStyle,
                {
                    borderRadius,
                    backgroundColor: ggTheme[theme].primary,
                    width
                },
            ]}>
            <Image
                source={require('@assets/icons/gg.png')}
                style={{
                    width: 28,
                    height: 28,
                    position: 'absolute',
                    left: 16,
                }} />
            <Text type='medium_16' style={{ color: ggTheme[theme].textColor }}>Login with Google</Text>
        </TouchableOpacity>
    )
}

export default GgLoginBtn

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
        height: 45,
        marginTop: 15
    },
})