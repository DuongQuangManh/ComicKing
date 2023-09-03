import { useLayout } from '@hooks'
import { myColors } from '@utils'
import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import useIsKeyboardShown from 'react-native-paper/src/utils/useIsKeyboardShown'

import { useSafeAreaInsets } from 'react-native-safe-area-context'


export type FooterProps = {
    children: React.ReactNode
    style?: ViewStyle
    flexRow?: boolean
    showOnKeyboard?: boolean
}

const FooterStyle: ViewStyle = {
    paddingHorizontal: 20,
    paddingTop: 10,
    justifyContent: 'center',
    backgroundColor: myColors.background,
}

const Footer = ({ children, style, flexRow, showOnKeyboard }: FooterProps) => {
    const insets = useSafeAreaInsets()
    const [keyboardShown, setKeyboardShown] = React.useState(false)

    const [layout, onLayout] = useLayout()

    useIsKeyboardShown({
        onShow: () => setKeyboardShown(true),
        onHide: () => setKeyboardShown(false),
    })
    const offset = 30
    const Styles: ViewStyle = {
        ...FooterStyle,
        marginBottom: insets.bottom + offset,
        marginHorizontal: Math.max(insets.left, insets.right),
        flexDirection: flexRow ? 'row' : 'column',
    }

    return (
        <View pointerEvents={layout.measured ? 'auto' : 'none'} onLayout={onLayout}>
            {(!keyboardShown || showOnKeyboard) && <View style={[Styles, style || {}]}>{children}</View>}
        </View>
    )
}

Footer.displayName = 'Footer'

export default Footer
