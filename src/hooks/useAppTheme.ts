import { useAppSelector } from "@redux/store"
import { myColors } from "@utils"

export const useAppTheme = () => {
    const { colorTheme } = useAppSelector(state => state.userSlice)
    if (colorTheme == 'light') {
        return {
            ...myColors,
        }
    }

    return {
        ...myColors,
        background: '#242526',
        text: '#fffffff0',
        primary_60:'#737373',
        // gray:'#18191a',
        gray: '#313233',
        // textHint: '#414245',
        textHint: '#787878',
        itemCustom: '#303134'
    }
}