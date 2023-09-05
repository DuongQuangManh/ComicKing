import {
    StyleProp,
    StyleSheet,
    Text,
    View,
    ViewStyle,
    Platform
} from 'react-native'
import React, { useEffect, useState } from 'react'
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell
} from 'react-native-confirmation-code-field'
import { myColors } from '@utils'

interface CodeInputProps {
    cellCount?: number,
    cellHeight?: number,
    cellWidth?: number,
    space?: number,
    dotSize?: number,
    onFull: (code: string) => void,
    containerStyle?: StyleProp<ViewStyle>
}

const CodeInput: React.FC<CodeInputProps> = ({
    cellCount = 6,
    cellHeight = 40,
    cellWidth = 37,
    space = 3,
    dotSize = 6,
    onFull,
    containerStyle
}) => {
    const [value, setValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });
    const ref = useBlurOnFulfill({ value, cellCount });

    useEffect(() => {
        if (value.length >= 6) {
            onFull(value)
        }
    }, [value])

    useEffect(() => {
        Platform.OS === "ios" ? ref.current?.focus() : setTimeout(() => ref.current?.focus(), 50)
    }, [])

    return (
        <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={cellCount}
            rootStyle={[styles.codeFieldRoot, containerStyle]}
            keyboardType="number-pad"
            textContentType="password"
            renderCell={({ index, symbol, isFocused }) => (
                <View
                    key={index}
                    onLayout={getCellOnLayoutHandler(index)}
                    style={[
                        {
                            width: cellWidth,
                            height: cellHeight,
                            marginHorizontal: space
                        },
                        styles.cell,
                        isFocused && styles.focusCell
                    ]}
                >
                    {symbol ?
                        (<View style={{
                            width: dotSize, height: dotSize,
                            borderRadius: Math.ceil(dotSize / 2),
                            backgroundColor: 'black'
                        }} />)
                        :
                        (<Text
                            style={{ fontSize: 24, paddingBottom: 3, color: myColors.primary }}>
                            {(isFocused ? <Cursor /> : null)}
                        </Text>)}
                </View>
            )}
        />
    );
}

export default CodeInput

const styles = StyleSheet.create({
    root: { flex: 1, padding: 20 },
    title: { textAlign: 'center', fontSize: 30 },
    codeFieldRoot: { justifyContent: 'center', marginVertical: 30 },
    cell: {
        lineHeight: 38,
        fontSize: 24,
        borderWidth: 1.5,
        borderColor: myColors.transparentGray,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    focusCell: {
        borderColor: myColors.primary,
        borderWidth: 2.5
    },
});