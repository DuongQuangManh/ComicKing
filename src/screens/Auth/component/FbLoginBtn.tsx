import { StyleSheet, ViewStyle, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { WINDOW_WIDTH, myColors } from '@utils';
import { Text } from '@components';

interface FbLoginBtnProps {
    onPress: () => void,
    theme?: 'dark' | 'light',
    width?: ViewStyle['width'],
    borderRadius?: number,
    containerStyle?: ViewStyle
}

const fbTheme = {
    light: {
        primary: '#fff',
        textColor: myColors.text
    },
    dark: {
        primary: '#4267B2',
        textColor: '#fff'
    }
}

const FbLoginBtn: React.FC<FbLoginBtnProps> = ({
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
                    backgroundColor: fbTheme[theme].primary,
                    width
                },
            ]}>
            <Image
                source={require('@assets/icons/fb.png')}
                style={{
                    width: 40,
                    height: 40,
                    position: 'absolute',
                    left: 4,
                }} />
            <Text type='medium_16' style={{ color: fbTheme[theme].textColor }}>Login with Facebook</Text>
        </TouchableOpacity>
    )
}

export default FbLoginBtn

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        height: 45,
        marginTop: 15
    },
})